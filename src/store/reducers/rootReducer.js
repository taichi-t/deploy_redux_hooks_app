import projectReducer from "./projectReducer";
import usersReducer from "./usersReducer";
import { createObjArraysMatchedId } from "../../util/createObjArraysMatchedId";
import { v4 as uuidv4 } from "uuid";

export function rootReducer(state, { type, payload }) {
  let newHistory;
  let newRoutine;

  switch (type) {
    case "ADD_NEW_ROUTINE_TO_NEW_FOLDER":
      newHistory = [...state.projects.history];
      newRoutine = createObjArraysMatchedId(newHistory, payload.todoIds);
      newRoutine = newRoutine.map((todo) => {
        delete todo.complete;
        return {
          ...todo,
          id: uuidv4(),
          check: false,
        };
      });
      return {
        projects: projectReducer(state.projects, { type, payload }),
        users: usersReducer(
          {
            ...state.users,
            routine: {
              ...state.users.routine,
              [uuidv4()]: {
                [payload.folderName]: newRoutine,
              },
            },
          },
          { type, payload }
        ),
      };

    default:
      return {
        projects: projectReducer(state.projects, { type, payload }),
        users: usersReducer(state.users, { type, payload }),
      };
  }
}

// newRoutine.concat(state.users.routine);