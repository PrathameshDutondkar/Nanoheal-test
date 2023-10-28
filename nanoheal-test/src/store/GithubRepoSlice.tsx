import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface GitHubRepo {
  id: number;
  name: string;
}

export interface GitHubReposState {
  repos: GitHubRepo[];
  loading: boolean;
  error: any;
}

export const fetchGitHubRepos = createAsyncThunk<GitHubRepo[], number>(
  "githubRepos/fetchRepos",
  async (page: number) => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoDate = thirtyDaysAgo.toISOString().split("T")[0];

    const response = await fetch(
      `https://api.github.com/search/repositories?q=created:>${thirtyDaysAgoDate}&sort=stars&order=desc&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`Something went wrong.plese try after sometimes`);
    }

    const data = await response.json();
    return data.items as GitHubRepo[];
  }
);

const githubRepoSlice = createSlice({
  name: "githubRepos",
  initialState: {
    repos: [],
    loading: false,
    error: null,
  } as GitHubReposState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGitHubRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGitHubRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload;
      })
      .addCase(fetchGitHubRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default githubRepoSlice.reducer;
