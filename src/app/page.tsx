"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Vazifalar uchun qat'iy tip
interface Task {
  id: string;
  title: string;
  category: string;
  deadline: string;
  status: "todo" | "progress" | "done";
}

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  // 1. Sahifa yuklanganda vazifalarni API-dan olib kelish
  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  // 2. Yangi vazifa qo'shish mantiqi
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: input }),
    });

    if (res.ok) {
      const newTask = await res.json();
      // Yangi kelgan vazifani eski vazifalar qatoriga qo'shamiz (UI darhol yangilanadi)
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setInput(""); // Inputni tozalab qo'yamiz
    }
  };

  // 3. Vazifani ustunlar bo'ylab harakatlantirish (todo -> progress -> done -> todo)
  const moveTask = async (id: string, currentStatus: "todo" | "progress" | "done") => {
    let nextStatus: "todo" | "progress" | "done";
    
    // Zanjirli mantiq
    if (currentStatus === "todo") nextStatus = "progress";
    else if (currentStatus === "progress") nextStatus = "done";
    else nextStatus = "todo";

    const res = await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: nextStatus }),
    });

    if (res.ok) {
      // O'zgartirilgan vazifani UI-da ham yangilaymiz
      setTasks(tasks.map(t => t.id === id ? { ...t, status: nextStatus } : t));
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigatsiya qismi */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold tracking-wider text-slate-400 uppercase">
            Vazifalar Boshqaruvi | <span className="text-blue-400">Proyektlar</span>
          </h1>
        </div>

        {/* Vazifa qo'shish formasi */}
        <form onSubmit={handleAddTask} className="flex gap-2 max-w-md mb-10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Yangi topshiriq nomi..."
            className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 text-slate-100 shadow-inner"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition shadow-md">
            Qo'shish
          </button>
        </form>

        {/* 3 TA USTUNLI KANBAN DOSKASI (Grid) */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          
          {/* ================= 1-USTUN: KUTILMOQDA ================= */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 backdrop-blur-md">
            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-center py-2 rounded-xl text-xs tracking-widest uppercase mb-4">
              Kutilmoqda
            </div>
            <div className="space-y-3">
              {tasks.filter(t => t.status === "todo").map(task => (
                <div 
                  key={task.id}
                  onClick={() => moveTask(task.id, task.status)}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 cursor-pointer hover:border-blue-500/50 hover:scale-[1.02] transition duration-200 shadow-sm"
                >
                  <span className="text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md">📄 {task.category}</span>
                  <h3 className="text-sm font-medium text-slate-200 mt-2 mb-3">{task.title}</h3>
                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span>📅 {task.deadline}</span>
                    <span className="text-blue-500 font-bold uppercase tracking-wider text-[10px]">Bajarish ➡️</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= 2-USTUN: BAJARILMOQDA ================= */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 backdrop-blur-md">
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-center py-2 rounded-xl text-xs tracking-widest uppercase mb-4">
              Bajarilmoqda
            </div>
            <div className="space-y-3">
              {tasks.filter(t => t.status === "progress").map(task => (
                <div 
                  key={task.id}
                  onClick={() => moveTask(task.id, task.status)}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 cursor-pointer hover:border-amber-500/50 hover:scale-[1.02] transition duration-200 shadow-sm"
                >
                  <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">📄 {task.category}</span>
                  <h3 className="text-sm font-medium text-slate-200 mt-2 mb-3">{task.title}</h3>
                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span>📅 {task.deadline}</span>
                    <span className="text-amber-500 font-bold uppercase tracking-wider text-[10px]">Yopish ➡️</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= 3-USTUN: BAJARILDI ================= */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 backdrop-blur-md">
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-center py-2 rounded-xl text-xs tracking-widest uppercase mb-4">
              Bajarildi
            </div>
            <div className="space-y-3">
              {tasks.filter(t => t.status === "done").map(task => (
                <div 
                  key={task.id}
                  onClick={() => moveTask(task.id, task.status)}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 cursor-pointer hover:border-emerald-500/50 hover:scale-[1.02] transition duration-200 opacity-60 hover:opacity-100 shadow-sm"
                >
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md line-through">📄 {task.category}</span>
                  <h3 className="text-sm font-medium text-slate-400 mt-2 mb-3 line-through">{task.title}</h3>
                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span>📅 Tugatildi</span>
                    <span className="text-slate-500 hover:text-white transition text-[10px] uppercase font-bold tracking-wider">🔄 Qaytarish</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}