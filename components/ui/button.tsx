import React from "react";

interface propsSchema {
	buttonName: string;
	className?: string;
	handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button(props: propsSchema) {
	return (
		<div>
			<button
				className={`font-serif ${props.className} text-xl`}
				onClick={(e) => props.handleClick(e)}
			>
				{props.buttonName}
			</button>
		</div>
	);
}
