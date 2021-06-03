import { useContext, createContext, useReducer, useMemo } from 'react';

const SELECT_REPOSITORY = 'SELECT_REPOSITORY';
const SET_REPOSITORIES = 'SET_REPOSITORIES';

const initialContext = {
  repositories: {},
  selectedRepostory: '',
};

export const SearchContext = createContext(initialContext);

function repositoryReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SELECT_REPOSITORY:
      return { ...state, selectedRepostory: payload.repositoryId };

    case SET_REPOSITORIES: {
      const { repositories } = payload;
      const { selectedRepostory } = state;
      return {
        ...state,
        selectedRepostory,
        repositories,
      };
    }

    default: {
      return state;
    }
  }
}

/**A context to provide a central store */
export const SearchContextProvider = ({ children }) => {
  const selectRepository = (repositoryId) => {
    dispatch({
      type: SELECT_REPOSITORY,
      payload: { repositoryId },
    });
  };

  const setRepositories = (repositories) => {
    dispatch({
      type: SET_REPOSITORIES,
      payload: {
        repositories,
      },
    });
  };

  const [state, dispatch] = useReducer(repositoryReducer, {
    ...initialContext,
    setRepositories,
    selectRepository,
  });

  const store = useMemo(() => state, [state]);

  return (
    <SearchContext.Provider value={store}>{children}</SearchContext.Provider>
  );
};

export function useSearchContext() {
  return useContext(SearchContext);
}
