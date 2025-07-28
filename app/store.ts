import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Alert = {
  id: string;
  message: string;
  location: string;
  timestamp: string;
  lat?: number;
  lng?: number;
};

export type Message = {
  id: string;
  content: string;
  timestamp: string;
  clientId: string;
  type: 'chat';
};

interface AlertsState {
  items: Alert[];
  activeId: string | null;
}

const initialState: AlertsState = {
  items: [],
  activeId: null,
};

//creating slice
const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    //action to add alerts
    addAlert: (state, action: PayloadAction<Alert>) => {
      state.items.unshift(action.payload);
      state.activeId = action.payload.id;
    },
    //action to establish active alerts
    setActive: (state, action: PayloadAction<string>) => {
      state.activeId = action.payload;
    },
  },
});

interface ChatState {
  messages: Message[];
  isConnected: boolean;
}

const initialChatState: ChatState = {
  messages: [],
  isConnected: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChatState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
});

interface UserState {
  clientId: string;
}

const initialUserState: UserState = {
  clientId: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setClientId: (state, action: PayloadAction<string>) => {
      state.clientId = action.payload;
    },
  },
});

const themeSlice = createSlice({
  name: 'theme',
  initialState: { darkMode: true }, // dark por defecto
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { addAlert, setActive } = alertsSlice.actions;
export const { addMessage, setConnectionStatus } = chatSlice.actions;
export const { setClientId } = userSlice.actions;
export const { toggleTheme } = themeSlice.actions;

//central store configuration
export const store = configureStore({
  reducer: {
    alerts: alertsSlice.reducer,
    chat: chatSlice.reducer,
    user: userSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;