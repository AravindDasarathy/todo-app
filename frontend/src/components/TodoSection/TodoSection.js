import './TodoSection.scss';
import React, { useState } from 'react';
import { connect } from 'react-redux';

function TodoSection({ todoDetails, updateTodoInServer }) {
  const [isHidden, setIsHidden] = useState(true);
  const [isChecked, setIsChecked] = useState(todoDetails.isCompleted);
  const expandDetailListener = () => setIsHidden(!isHidden);

  // checkbox listener that updates the todo in the server
  const checkboxListener = async (checkbox) => {
    const isChecked = checkbox.currentTarget.checked;

    setIsChecked(isChecked);
    updateTodoInServer(todoDetails.id, { isCompleted: isChecked });
  };

  return (
    <div className="todo-item flex-item border-bottom">
      <div className="flex-item">
        <input
          type="checkbox"
          onChange={checkboxListener}
          checked={isChecked} />
        <section
          className={isChecked
            ? "todo-title strikethrough"
            : "todo-title"}
        >{todoDetails.title}</section>
        <i
          className="fa-sharp fa-solid fa-up-right-and-down-left-from-center fa-shake"
          onClick={expandDetailListener}/>
      </div>

      <div className="todo-details" hidden={isHidden}>
        <div className="flex-item">
          <h4>Description</h4>
          <p>{todoDetails.description}</p>
        </div>
        <div className="flex-item">
          <h4>Due Date</h4>
          <p>{todoDetails.due_date}</p>
        </div>
        <div className="flex-item">
          <h4>Time</h4>
          <p>{todoDetails.time}</p>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  updateTodoInServer: (id, todo) => dispatch({
    type: 'UPDATE_TODO_IN_SERVER',
    payload: todo,
    id: id,
    dispatch
  })
});

export default connect(null, mapDispatchToProps)(TodoSection);

