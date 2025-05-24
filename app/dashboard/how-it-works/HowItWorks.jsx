"use client";
import React from "react";
import { Lightbulb, User, Video, CheckCircle, BarChart2, MessageCircle, BookOpen } from "lucide-react";
import Image from "next/image";

const steps = [
	{
		icon: <User className="text-[#0a7a77] w-8 h-8" />,
		title: "Create Your Profile",
		desc: "Sign up and set your job role, experience, and tech stack for personalized mock interviews.",
	},
	{
		icon: <Video className="text-[#0a7a77] w-8 h-8" />,
		title: "Start a Mock Interview",
		desc: "Enable your webcam and microphone. Practice with AI-generated questions tailored to your field.",
	},
	{
		icon: <MessageCircle className="text-[#0a7a77] w-8 h-8" />,
		title: "Record & Review Answers",
		desc: "Answer each question out loud. Get instant AI feedback and see model answers for comparison.",
	},
	{
		icon: <BarChart2 className="text-[#0a7a77] w-8 h-8" />,
		title: "Track Your Progress",
		desc: "Visualize your strengths and weak areas with interactive charts and detailed feedback.",
	},
	{
		icon: <BookOpen className="text-[#0a7a77] w-8 h-8" />,
		title: "Learn & Improve",
		desc: "Access curated articles and resources to boost your skills in your chosen field.",
	},
	{
		icon: <CheckCircle className="text-[#0a7a77] w-8 h-8" />,
		title: "Ace Your Real Interview!",
		desc: "Practice regularly, review feedback, and walk into your next interview with confidence!",
	},
];

export default function HowItWorks() {
	return (
		<div className="min-h-screen bg-[#0a7a77] flex flex-col items-center py-12 px-4">
			<div className="max-w-3xl w-full mx-auto">
				<div className="flex flex-col items-center mb-10">
					<Image
						src="/assets/mockFooter.png"
						width={70}
						height={70}
						alt="AI Icon"
						className="mb-2"
					/>
					<h1 className="text-4xl md:text-5xl font-bold text-[#e1fffe] text-center mb-2 tracking-wide">
						How It Works
					</h1>
					<p className="text-[#e1fffe] text-lg text-center max-w-xl">
						MockMate uses AI to simulate real interviews, provide instant feedback,
						and help you master your next job interview. Here’s how to get the most
						out of it:
					</p>
				</div>
				<div className="grid gap-8 md:grid-cols-2">
					{steps.map((step, idx) => (
						<div
							key={idx}
							className="bg-[#e1fffe] rounded-xl shadow-md p-6 flex flex-col gap-3 items-start hover:scale-[1.03] transition-transform"
						>
							<div className="flex items-center gap-3 mb-2">
								{step.icon}
								<span className="font-bold text-lg text-[#0a3d62]">
									{step.title}
								</span>
							</div>
							<p className="text-[#0a3d62] text-sm">{step.desc}</p>
						</div>
					))}
				</div>
				<div className="mt-12 flex flex-col items-center">
					<Lightbulb className="w-10 h-10 text-[#C3FF93] mb-2 animate-pulse" />
					<h2 className="text-2xl font-bold text-[#e1fffe] mb-2">
						Tips to Ace Your Interview
					</h2>
					<ul className="text-[#e1fffe] text-md list-disc list-inside space-y-1 max-w-xl">
						<li>
							Practice regularly to build confidence and reduce anxiety.
						</li>
						<li>
							Review AI feedback and focus on improving weak areas.
						</li>
						<li>
							Use the model answers to learn how to structure your responses.
						</li>
						<li>
							Explore recommended articles to stay updated in your field.
						</li>
						<li>
							Simulate real interview conditions for best results.
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
