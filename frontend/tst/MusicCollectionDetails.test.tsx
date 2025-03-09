import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MusicCollectionDetails } from "../src/pages";

jest.mock("../src/dao", () => ({
  useCollectionDetails: jest.fn(),
}));

import { useCollectionDetails } from "../src/dao";

const queryClient = new QueryClient();

describe("MusicCollectionDetails Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <MusicCollectionDetails />
        </MemoryRouter>
      </QueryClientProvider>
    );

  it("shows loading state initially", async () => {
    (useCollectionDetails as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      failureReason: null,
    });

    renderComponent();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders error message when API fails", async () => {
    (useCollectionDetails as jest.Mock).mockReturnValue({
      isLoading: false,
      failureReason: { message: "Failed to fetch" },
      data: null,
    });

    renderComponent();

    await waitFor(() =>
      expect(screen.getByTestId("error_component")).toBeInTheDocument()
    );
    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });

  it("renders collection details when API resolves successfully", async () => {
    (useCollectionDetails as jest.Mock).mockReturnValue({
      isLoading: false,
      failureReason: null,
      data: {
        response: {
          id: "1",
          name: "Epic Music",
          artist: "John Doe",
          type: "Album",
          songCount: 10,
          durationInSeconds: 3600,
          sizeInBytes: 52428800,
          releasedOn: "2024-07-22T21:56:22.639Z",
          songs: [
            {
              title: "Song 1",
              durationInSeconds: 240,
              sizeInBytes: 5242880,
              performers: ["John Doe"],
            },
          ],
        },
      },
    });

    renderComponent();

    await waitFor(() =>
      expect(screen.getByText("Epic Music")).toBeInTheDocument()
    );
    expect(screen.getAllByText("John Doe")[1]).toBeInTheDocument();
    expect(screen.getByText("Album")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Song 1")).toBeInTheDocument();
  });
});
