interface CardProps {
	title: string;
	value: string | number;
	description?: string;
}

export function StatCard({ title, value, description }: CardProps) {
	return (
		<div className="col-span-1 stats">
			<div className="bg-base-100 rounded-2xl shadow stat place-items-center">
				<div className="stat-title text-2xl break-words">{title}</div>
				<div className="stat-value text-4xl">{value}</div>
				<div className="stat-desc text-lg">{description}</div>
			</div>
		</div>
	);
}
