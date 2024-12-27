import { PriorityLevel } from "../components/types";

export const tasks = [
  {
    taskTitle: 'Design Homepage',
    projectTitle: 'Website Redesign',
    priorityLevel: PriorityLevel.low,
    assignee: 'Dinescu Denisa',
    ticketNumber: "aaa-123"
  },
  {
    taskTitle: 'Develop API',
    projectTitle: 'Mobile App Development',
    priorityLevel: PriorityLevel.critical,
    assignee: 'Ples Serban',
    ticketNumber: "bbb-456"
  },
  {
    taskTitle: 'Something',
    projectTitle: 'Website Redesign',
    priorityLevel: PriorityLevel.high,
    assignee: 'Horoba Andreea',
    ticketNumber: "ccc-642"
  },
  {
    taskTitle: 'Develop Extend functionality',
    projectTitle: 'Mobile App Development',
    priorityLevel: PriorityLevel.medium,
    assignee: 'Dragos Alexandru',
    ticketNumber: "ddd-975"
  },
  {
    taskTitle: 'Develop API',
    projectTitle: 'New Application',
    priorityLevel: PriorityLevel.critical,
    assignee: 'Criznic Ana',
    ticketNumber: "eee-358"
  }
];

export const assigneeList = ['Dinescu Denisa', 'Ples Serban', 'Dragos Alexandru', 'Horoba Andreea', 'Criznic Ana'];