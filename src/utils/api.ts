export const fetchThreadById = async (id: string, pageNumber: number) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/Thread/${id}?pageNumber=${pageNumber}&pageSize=10`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const fetchCategories = async () => {
  const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/Category`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const fetchThreadsByForum = async (id: string, pageNumber: number) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/Thread/ThreadsByForum?id=${id}&pagenumber=${pageNumber}&pagesize=10`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const addCategory = async (name: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/Category`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to create category");
  }
  return res.json();
};

export const deleteCategory = async (categoryId: number) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/Category/${categoryId}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to delete category");
  }
};

export const fetchForums = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/Forum/GetAllForums`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const addForum = async (name: string, categoryId: number) => {
  const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/Forum`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, categoryId }),
  });
  if (!res.ok) {
    throw new Error("Failed to create forum");
  }
  return res.json();
};

export const deleteForum = async (forumId: number) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/Forum/${forumId}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to delete forum");
  }
};

export const fetchUsers = async (pageNumber: number) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/Account/GetAllUsers?pageNumber=${pageNumber}&pageSize=5`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const deleteUser = async (userId: string) => {
  const res = await fetch(
    `https://localhost:7094/api/Account/DeleteUser/${userId}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to delete user");
  }
};

export const addReaction = async (
  commentId: number,
  type: number,
  userId: string
) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/Comment/Reaction`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Type: type,
        UserId: userId,
        CommentId: commentId,
      }),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to add reaction");
  }
  return res.json();
};

export const createComment = async (
  content: string,
  threadId: number,
  userId: string
) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/Comment/Comment`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Content: content,
        ThreadId: threadId,
        UserId: userId,
        ParentCommentId: null,
      }),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to create comment");
  }
  return res.json();
};

export const createThread = async (
  title: string,
  content: string,
  tag: string,
  userId: string,
  forumId: number
) => {
  const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/Thread/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Title: title,
      Content: content,
      Tag: tag,
      IsSticky: false,
      UserId: userId,
      ForumId: forumId,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to create thread");
  }
  return res.json();
};

export const fetchCommentById = async (id: number) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/Comment/${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch comment");
  }
  return res.json();
};

export const fetchEmojisAndStickers = async (name: string) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/EmojiAndSticker?name=${encodeURIComponent(name)}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch emojis and stickers");
  }
  return res.json();
};

export const fetchForumsByCategory = async (categoryId: number) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/Forum/${categoryId}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch forums");
  }
  return res.json();
};

export const loginUser = async (userName: string, password: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/Account/Login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UserName: userName, Password: password }),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to login");
  }
  return res.json();
};

export const registerUser = async (
  userName: string,
  displayName: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/Account/RegisterUser`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UserName: userName,
        DisplayName: displayName,
        Email: email,
        Password: password,
        ConfirmPassword: confirmPassword,
      }),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to register");
  }
  return res.json();
};

export const searchThreads = async ({
  query,
  forum,
  tag,
  pageNumber,
  pageSize,
}: {
  query: string;
  forum?: string;
  tag?: string;
  pageNumber: number;
  pageSize: number;
}) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/Search/search?keyword=${encodeURIComponent(
      query
    )}&forum=${encodeURIComponent(forum || "")}&tag=${encodeURIComponent(
      tag || ""
    )}&pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }
  return res.json();
};

export const fetchUser = async (userId: string) => {
  // const delay = (ms: number) =>
  //   new Promise((resolve) => setTimeout(resolve, ms));

  // // Trì hoãn 2 giây (2000 ms)
  // await delay(200000000);
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/Account/GetUser?userId=${userId}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
};

export const fetchViewedThread = async (userId: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}/ViewedThread?userId=${userId}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch viewed threads");
  }
  return res.json();
};

export const fetchThreadByUserId = async (userId: string) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/Thread/GetThreadByUserId?userId=${userId}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch threads by user");
  }
  return res.json();
};

export const uploadAvatar = async (userId: string, formData: FormData) => {
  const res = await fetch(
    `${
      import.meta.env.VITE_REACT_APP_API_URL
    }/Account/upload-avatar?userId=${userId}`,
    {
      method: "POST",
      body: formData,
    }
  );
  if (!res.ok) {
    throw new Error("Failed to upload avatar");
  }
  return res.json();
};
