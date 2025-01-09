import { NextResponse, NextRequest } from "next/server";

export default function hanlder(req: NextRequest, res: NextResponse) {
	if (req.method === "GET") {
		return NextResponse.json({
			msg: "Hello",
		});
	} else if (req.method === "POST") {
		return NextResponse.json({
			msg: "Melo",
		});
	}
}

export { hanlder as GET, hanlder as POST };
