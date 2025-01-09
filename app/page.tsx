"use client";

import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
	const router = useRouter();

	const buttonFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
		router.push("/dashboard");
	};
	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<Button
				className="bg-blue-500 rounded-md p-2 text-center"
				buttonName="Create your Avatar and Join"
				handleClick={(e) => buttonFunction(e)}
			/>
		</div>
	);
}
