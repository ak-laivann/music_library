import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MusicCollections } from "../src/pages";

const queryClient = new QueryClient();

jest.mock("../src/dao", () => ({
  useCollections: jest.fn(),
}));

import { useCollections } from "../src/dao";

describe("MusicCollections Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <MusicCollections />
        </MemoryRouter>
      </QueryClientProvider>
    );

  it("shows loading state initially", async () => {
    (useCollections as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
      failureReason: null,
    });

    renderComponent();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders empty state when no data is available", async () => {
    (useCollections as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      failureReason: null,
    });

    renderComponent();

    await waitFor(() =>
      expect(screen.getAllByText("No data")[1]).toBeInTheDocument()
    );
  });

  it("renders album data when API resolves successfully", async () => {
    (useCollections as jest.Mock).mockReturnValue({
      isLoading: false,
      failureReason: null,
      data: {
        response: [
          {
            id: "1",
            name: "Epic Album",
            artist: "John Doe",
            type: "Album",
            songCount: 10,
            durationInSeconds: 3600,
            sizeInBytes: 2,
            releasedOn: "November",
          },
        ],
      },
    });

    renderComponent();

    await waitFor(() =>
      expect(screen.getByText("Epic Album")).toBeInTheDocument()
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Album")).toBeInTheDocument();
  });

  it("renders error", async () => {
    (useCollections as jest.Mock).mockReturnValue({
      isLoading: false,
      failureReason: { message: "Error happened" },
      data: null,
    });

    renderComponent();

    await waitFor(() =>
      expect(screen.getByTestId("error_component")).toBeInTheDocument()
    );
    expect(screen.getByText("Error happened")).toBeInTheDocument();
  });
});
