import { ReactNode } from "react";

interface CardProps {
	children: ReactNode;
}

export function Card({ children }: CardProps) {
	return (
		<div className="bg-base-100 rounded-2xl shadow p-6 m-4">
			{children}
		</div>
	);
}
