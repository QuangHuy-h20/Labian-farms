import { useContext, createContext, FC, useReducer } from 'react';

type ModalName = 'LOGIN' | 'REGISTER'
interface State {
	name?: ModalName
	data?: any
	isOpen: boolean
}

type Action = | { type: 'open', name?: ModalName, payload?: any } | { type: 'close' }

const initialState: State = {
	name: undefined,
	data: null,
	isOpen: false
}

function modalReducer(state: State, action: Action): State {
	switch (action.type) {
		case 'open':
			return {
				...state,
				name: action.name,
				data: action.payload,
				isOpen: true
			}
		case 'close':
			return {
				...state,
				name: undefined,
				data: null,
				isOpen: false
			}
		default:
			throw new Error();
	}
}

const ModalStateContext = createContext<State>(initialState)
ModalStateContext.displayName = 'ModalStateContext'

const ModalActionContext = createContext<React.Dispatch<Action | undefined>>(undefined)
ModalActionContext.displayName = 'ModalActionContext'

export const ModalProvider: FC = ({ children }) => {
	const [state, dispatch] = useReducer(modalReducer, initialState);
	return (
		<>
			<ModalStateContext.Provider value={state}>
				<ModalActionContext.Provider value={dispatch}>
					{children}
				</ModalActionContext.Provider>
			</ModalStateContext.Provider>
		</>
	)
}

export function useModalState() {
	const context = useContext(ModalStateContext);
	if (context === undefined) {
	  throw new Error(`useModalState must be used within a ModalProvider`);
	}
	return context;
  }
  
  export function useModalAction() {
	const dispatch = useContext(ModalActionContext);
	if (dispatch === undefined) {
	  throw new Error(`useModalAction must be used within a ModalProvider`);
	}
	return {
	  openModal(name?: ModalName, payload?: unknown) {
		dispatch({ type: 'open', name, payload });
	  },
	  closeModal() {
		dispatch({ type: 'close' });
	  },
	};
  }
  

