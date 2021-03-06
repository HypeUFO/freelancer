const initialState = {
        timerStop: 0,
        isTimeModalOpen: false
    }


const timeTrackerReducer = (state=initialState, action) => {
    state = state || initialState
    switch(action.type) {
        case 'UPDATE_STOP_TIME':
            return {
                ...state,
                timerStop: action.time,
            }
        case 'TASK_COMPLETED':
            return {
                ...state,
                timerStop: 0,
            }
        case 'UPDATE_TIME_MODAL':
            return {
                ...state,
                isTimeModalOpen: !state.isTimeModalOpen
            }
        default:
            return state;
        }
    }

export default timeTrackerReducer;

