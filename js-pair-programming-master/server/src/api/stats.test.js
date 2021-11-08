const stats = require('./stats');

it('I can fetch stats of workout 1', async () => {
  const results = await stats(1);

  expect(results).toMatchObject({
    averageHeartRate: '113',
    totalReps: '255'
  });

});
