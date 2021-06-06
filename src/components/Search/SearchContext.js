import { useContext, createContext, useReducer, useMemo } from 'react';
import { DESC, BEST_MATCH } from '../../constants';

const SELECT_REPOSITORY = 'SELECT_REPOSITORY';
const SET_REPOSITORIES = 'SET_REPOSITORIES';
const UPDATE_SEARCH = 'UPDATE_SEARCH';

const initialContext = {
  repositories: [],
  selectedRepostory: null,
  isLoading: false,
  search: {
    term: '',
    sort: BEST_MATCH,
    order: DESC,
    language: '',
  },
};

export const SearchContext = createContext(initialContext);

function repositoryReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SELECT_REPOSITORY:
      return { ...state, selectedRepository: payload.repositoryId };

    case SET_REPOSITORIES: {
      const { repositories } = payload;
      const { selectedRepostory } = state;
      return {
        ...state,
        selectedRepostory,
        repositories,
      };
    }

    case UPDATE_SEARCH:
      const { search } = payload;
      return { ...state, search };

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

  const updateSearch = (search) =>
    dispatch({
      type: UPDATE_SEARCH,
      payload: {
        search,
      },
    });

  const [state, dispatch] = useReducer(repositoryReducer, {
    ...initialContext,
    setRepositories,
    selectRepository,
    updateSearch,
  });

  const store = useMemo(() => state, [state]);

  return (
    <SearchContext.Provider value={store}>{children}</SearchContext.Provider>
  );
};

export function useSearchContext() {
  return useContext(SearchContext);
}
