import { PriorityLevel, Status } from "../components/types";
import { chevronUp, chevronsUp, chevronDown} from 'react-icons-kit/feather';
import {minus} from 'react-icons-kit/typicons/minus';
export const tasks = [
  {
    taskTitle: 'Design Homepage',
    projectTitle: 'Website Redesign',
    priorityLevel: PriorityLevel.low,
    assignee: 'Dinescu Denisa',
    ticketNumber: "aaa-123",
    status: Status.InProgress,
    description: ""
  },
  {
    taskTitle: 'Develop API',
    projectTitle: 'Mobile App Development',
    priorityLevel: PriorityLevel.critical,
    assignee: 'Ples Serban',
    ticketNumber: "bbb-456",
    status: Status.ToDo,
    description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet', comes from a line in section 1.10.32."
  },
  {
    taskTitle: 'Something',
    projectTitle: 'Website Redesign',
    priorityLevel: PriorityLevel.high,
    assignee: 'Horoba Andreea',
    ticketNumber: "ccc-642",
    status: Status.DevQA,
    description: ""
  },
  {
    taskTitle: 'Develop Extend functionality',
    projectTitle: 'Mobile App Development',
    priorityLevel: PriorityLevel.medium,
    assignee: 'Dragos Alexandru',
    ticketNumber: "ddd-975",
    status: Status.InProgress,
    description: ""
  },
  {
    taskTitle: 'Develop API',
    projectTitle: 'New Application',
    priorityLevel: PriorityLevel.critical,
    assignee: 'Criznic Ana',
    ticketNumber: "eee-358",
    status: Status.Done,
    description: ""
  }
];

export const assigneeList = ['Dinescu Denisa', 'Ples Serban', 'Dragos Alexandru', 'Horoba Andreea', 'Criznic Ana'];

export const prioritySettings = {
  [PriorityLevel.low]: { icon: chevronDown, color: '#28a745' }, // Green for Low
  [PriorityLevel.medium]: { icon: minus, color: '#ffc107' }, // Yellow for Medium
  [PriorityLevel.high]: { icon: chevronUp,  color: '#e67e22' }, // Orange for High
  [PriorityLevel.critical]: { icon: chevronsUp, color:'#d9534f' } // Red for Critical
};