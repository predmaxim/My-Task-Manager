import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {TaskContent} from '../TaskContent';
import {TaskType} from 'utils/types';
import {TEMP_USER} from 'utils/constants';

// Mock the onSubmit function
const mockOnSubmit = jest.fn();

const sampleTask: TaskType = {
    name: 'Sample Task',
    status: 'queue',
    priority: 'low',
    due: false,
    description: 'Sample description',
    created: new Date(),
    number: 5,
    user: TEMP_USER,
    project: 'TEST',
    index: 0
  }
;

test('renders TaskContent component', () => {
  render(<TaskContent task={sampleTask} onSubmit={mockOnSubmit}/>);
  expect(screen.getByText(/Name:/i)).toBeInTheDocument();
});

test('calls onSubmit with correct data when form is submitted', () => {
  render(<TaskContent task={sampleTask} onSubmit={mockOnSubmit}/>);
  // Simulate user entering a task name
  const nameInput = screen.getByRole('textbox', {name: /Name:/i});
  userEvent.type(nameInput, 'Updated Task');

  // Simulate user submitting the form
  const form = screen.getByTestId('TaskContentForm');
  fireEvent.submit(form);

  // Check if onSubmit is called with the correct data
  expect(mockOnSubmit).toHaveBeenCalledWith({
    name: 'Updated Task',
    status: sampleTask.status,
    priority: sampleTask.priority,
    done: false
  });
});
