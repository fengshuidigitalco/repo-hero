import { useContext, createContext, useReducer, useMemo } from 'react';

const SELECT_REPOSITORY = 'SELECT_REPOSITORY';
const SET_REPOSITORIES = 'SET_REPOSITORIES';
const SET_IS_LOADING = 'SET_IS_LOADING';

const initialContext = {
  repositories: {},
  selectedRepostory: '',
  isLoading: false,
};

export const SearchContext = createContext(initialContext);

function repositoryReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SELECT_REPOSITORY:
      return { ...state, selectedRepository: payload.repositoryId };

    case SET_REPOSITORIES: {
      const { repositories } = payload;
      /** normalize the repositories so they're easier to access */
      const repositoryMap = repositories.reduce((hash, repository) => {
        const { id } = repository;
        hash[id] = repository;
        return hash;
      }, {});

      const { selectedRepostory } = state;
      return {
        ...state,
        selectedRepostory,
        repositories: repositoryMap,
      };
    }

    case SET_IS_LOADING:
      const { isLoading } = payload;
      return { ...state, isLoading };

    default: {
      return state;
    }
  }
}

/**A context to provide a central store */
export const SearchContextProvider = ({ children }) => {
  const selectRepository = (repositoryId) =>
    dispatch({
      type: SELECT_REPOSITORY,
      payload: { repositoryId },
    });

  const setRepositories = (repositories) =>
    dispatch({
      type: SET_REPOSITORIES,
      payload: {
        repositories,
      },
    });

  const setIsLoading = (isLoading) =>
    dispatch({
      type: SET_IS_LOADING,
      payload: {
        isLoading,
      },
    });

  const [state, dispatch] = useReducer(repositoryReducer, {
    ...initialContext,
    setRepositories,
    selectRepository,
    setIsLoading,
  });

  const store = useMemo(() => state, [state]);

  return (
    <SearchContext.Provider value={store}>{children}</SearchContext.Provider>
  );
};

export function useSearchContext() {
  return useContext(SearchContext);
}
