import React, { useState, createContext } from "react";

export const AuthUserContext = createContext({});

export const AuthUserProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<firebase.User | null>(null);

	return (
		<AuthUserContext.Provider value={{ user, setUser }}>
			{children}
		</AuthUserContext.Provider>
	);
};
