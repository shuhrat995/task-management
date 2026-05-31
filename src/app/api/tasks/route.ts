import { NextResponse } from "next/server";

interface Task {
  id: string;
  title: string;
  category: string;
  deadline: string;
  status: "todo" | "progress" | "done";
}

let tasks: Task[] = [
  { id: "1", title: "Landing Page Dizayni", category: "Project", deadline: "28h", status: "todo" },
  { id: "2", title: "Dark Mode Xatolarini Tuzatish", category: "Project", deadline: "28h", status: "todo" },
  { id: "3", title: "Mobil Ilova Prototiplari", category: "Project", deadline: "23h", status: "todo" },
  { id: "4", title: "Lexora API Integratsiyasi", category: "Project", deadline: "27h", status: "progress" },
  { id: "5", title: "Tarkib Rejasi", category: "Project", deadline: "25h", status: "progress" },
  { id: "6", title: "Testlash Vaqti", category: "Project", deadline: "27h", status: "done" },
];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTask: Task = {
    id: Date.now().toString(),
    title: body.title,
    category: "Project",
    deadline: "24h",
    status: "todo",
  };
  tasks.push(newTask);
  return NextResponse.json(newTask);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, status } = body;

  tasks = tasks.map((task) => 
    task.id === id ? { ...task, status } : task
  );

  return NextResponse.json({ success: true });
}