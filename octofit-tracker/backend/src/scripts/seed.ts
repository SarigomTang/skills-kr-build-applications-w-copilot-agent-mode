import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const teamSeeds = [
      { name: 'Trail Blazers', description: 'Outdoor runners who love a challenge.' },
      { name: 'Coastal Crew', description: 'A balanced team focused on steady progress.' },
    ];
    const teams = await Promise.all(
      teamSeeds.map(({ name, description }) =>
        Team.findOneAndUpdate(
          { name },
          { $set: { description }, $setOnInsert: { members: [] } },
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
        ),
      ),
    );
    const [trailBlazers, coastalCrew] = teams;

    const userSeeds = [
      { username: 'alex.runner', email: 'alex@example.com', name: 'Alex Morgan', team: trailBlazers._id },
      { username: 'sam.cyclist', email: 'sam@example.com', name: 'Sam Rivera', team: coastalCrew._id },
      { username: 'jordan.swims', email: 'jordan@example.com', name: 'Jordan Lee', team: trailBlazers._id },
    ];
    const users = await Promise.all(
      userSeeds.map(({ email, ...user }) =>
        User.findOneAndUpdate(
          { email },
          { $set: user },
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
        ),
      ),
    );
    const [alex, sam, jordan] = users;

    await Promise.all([
      Team.updateOne({ _id: trailBlazers._id }, { $set: { members: [alex._id, jordan._id] } }),
      Team.updateOne({ _id: coastalCrew._id }, { $set: { members: [sam._id] } }),
    ]);

    const activitySeeds = [
      { user: alex._id, type: 'run' as const, durationMinutes: 32, distanceKm: 5.2, calories: 340, completedAt: new Date('2026-11-02T08:00:00Z') },
      { user: sam._id, type: 'cycle' as const, durationMinutes: 45, distanceKm: 18.4, calories: 410, completedAt: new Date('2026-11-03T07:30:00Z') },
      { user: jordan._id, type: 'swim' as const, durationMinutes: 28, distanceKm: 1.1, calories: 290, completedAt: new Date('2026-11-04T17:15:00Z') },
    ];
    await Promise.all(
      activitySeeds.map(({ user, type, ...activity }) =>
        Activity.findOneAndUpdate(
          { user, type, completedAt: activity.completedAt },
          { $set: { ...activity, user, type } },
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
        ),
      ),
    );

    const leaderboardSeeds = [
      { user: alex._id, points: 860 },
      { user: jordan._id, points: 720 },
      { user: sam._id, points: 640 },
    ];
    await Promise.all(
      leaderboardSeeds.map(({ user, points }) =>
        Leaderboard.findOneAndUpdate(
          { user },
          { $set: { points, period: 'all-time' } },
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
        ),
      ),
    );

    const workoutSeeds = [
      {
        name: 'Steady 5K',
        description: 'A conversational-pace run to build aerobic endurance.',
        difficulty: 'beginner' as const,
        durationMinutes: 35,
        activityType: 'run' as const,
      },
      {
        name: 'Strength Circuit',
        description: 'A full-body circuit with bodyweight movements.',
        difficulty: 'intermediate' as const,
        durationMinutes: 30,
        activityType: 'strength' as const,
      },
      {
        name: 'Recovery Flow',
        description: 'Gentle mobility work and stretching for recovery.',
        difficulty: 'beginner' as const,
        durationMinutes: 20,
        activityType: 'recovery' as const,
      },
    ];
    await Promise.all(
      workoutSeeds.map(({ name, ...workout }) =>
        Workout.findOneAndUpdate(
          { name },
          { $set: workout },
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
        ),
      ),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
