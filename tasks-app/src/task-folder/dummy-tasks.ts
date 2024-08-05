import { Task } from "./task/task.interface";

export const dummyTasks: Task[] = [
  {
    id: 'task1',
    title: 'Design the login page',
    description:
      'Create a modern and user-friendly login page for the application.',
    userId: '66b1032ec2798e5a52f69fd2', // Alice Johnson
    projectId: 'project1',
  },
  {
    id: 'task2',
    title: 'Implement API endpoints',
    description:
      'Develop and test the API endpoints for user authentication and data retrieval.',
    userId: '66b1032ec2798e5a52f69fd2', // Bob Smith
    projectId: 'project2',
  },
  {
    id: 'task3',
    title: 'User interface improvements',
    description: 'Enhance the UI of the dashboard based on user feedback.',
    userId: '669c1880ee46a7b30fd6c64c', // Charlie Brown
    projectId: 'project3',
  },
  {
    id: 'task4',
    title: 'Marketing campaign strategy',
    description:
      'Develop a strategy for the upcoming marketing campaign to increase user engagement.',
    userId: '669c188bee46a7b30fd6c64d', // Diana Prince
    projectId: 'project4',
  },
  {
    id: 'task5',
    title: 'Database optimization',
    description:
      'Optimize the database queries to improve application performance.',
    userId: '66b1032ec2798e5a52f69fd2', // Edward Carter
    projectId: 'project5',
  },
  {
    id: 'task6',
    title: 'Data analysis report',
    description:
      'Generate a report on user behavior and trends based on recent data.',
    userId: '66b10381c2798e5a52f69fd4', // Fiona Green
    projectId: 'project6',
  },
  {
    id: 'task7',
    title: 'Angular report',
    description:
      'Generate a report on user behavior and trends based on recent data.',
    userId: '66b10381c2798e5a52f69fd4', // Fiona Green
    projectId: 'project6',
  },
  {
    id: 'task8',
    title: 'Data analysis report',
    description:
      'Generate a report on user behavior and trends based on recent data.',
    userId: '669c1880ee46a7b30fd6c64c', 
    projectId: 'project6',
  },
];
