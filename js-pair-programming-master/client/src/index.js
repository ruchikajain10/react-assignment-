import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import client from "./apollo-client";

import logo from "./logo.png";
import registerServiceWorker from "./registerServiceWorker";

import styled from "styled-components";
import "./index.css";

const Container = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  background-color: black;
  height: 150px;
  padding: 20px;
  color: white;
`;

const Logo = styled.img`
  height: 80px;
`;

const Debug = styled.a`
  position: fixed;
  top: 10px;
  right: 10px;
  color: white;
`;

const WORKOUT_QUERY = gql`
  query {
    workouts {
      id
      title
      image
    }
  }
`;

const STATS_QUERY = gql`
  query Stats($workoutId: Int!) {
    workoutStats(workoutId: $workoutId) {
      bpm {
        average
      }
      reps {
        sum
      }
    }
  }
`;

const Stats = ({ workoutId }) => {
  const { loading, error } = useQuery(STATS_QUERY, {
    variables: {
      workoutId,
    },
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;
  return (
    <div>
      <p>Average Heart Rate: </p>
      <p>Total Reps: </p>
    </div>
  );
};

const Workouts = () => {
  const { loading, error, data } = useQuery(WORKOUT_QUERY);
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() =>{
    // Make API call and get data
    setWorkoutData([
      {
        id: "1",
        title: "Cardio Circuits #3",
        image:
          "https://betawebsite.fiit-static.net/app/uploads/2020/05/05062927/Gede_thumbnail.jpg",
      },
      {
        id: "2",
        title: "Blaze #1",
        image:
          "https://betawebsite.fiit-static.net/app/uploads/2020/03/18144822/Gus-Middle-4.jpg",
      },
      {
        id: "3",
        title: "Cardio Kettlebell #2",
        image:
          "https://betawebsite.fiit-static.net/app/uploads/2020/02/26092456/March-Classes-Featured.jpg",
      },
      {
        id: "4",
        title: "Pace #9",
        image:
          "https://betawebsite.fiit-static.net/app/uploads/2019/07/23102301/Fiit-club-4-Middle-scaled.jpg",
      },
      {
        id: "5",
        title: "Power #1",
        image:
          "https://betawebsite.fiit-static.net/app/uploads/2020/01/23110205/Cardio-Kettlebell-4-Middle-scaled.jpg",
      },
    ]);
  },[]);

  const [selectedOption, setSelectedOption] = useState("");
  const handleSelection = (event) =>{
    setSelectedOption(event.target.value);
    console.log('Selected Image',event.target.value);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;
  return (
    <div>
      <div style={{marginBottom: '5rem',marginTop: '2rem'}}>
        <select selected={workoutData[0].title} onChange={handleSelection} name="selectList" id="selectList">
          {
            workoutData.map((el,index) =>{
              return (
                <option key={index} value={el.image}>{el.title}</option>
              )
            })
          }
        </select>
      </div>
      <img style={{width: '500px'}} src={!!selectedOption? selectedOption: workoutData[0].image} alt="Testing logo" />
    </div>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <Container>
      <AppHeader>
        <Logo src={logo} className="App-logo" alt="logo" />
        <h1>Workout Results </h1>
        <Debug
          href={`http://localhost:${process.env.REACT_APP_SERVER_PORT}/graphql`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Debug
        </Debug>
      </AppHeader>
      <Workouts />
    </Container>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
