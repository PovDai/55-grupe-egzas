import { motion } from "framer-motion";
export function TestPage() {
    return (
        <div className="container flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200 p-6">
<motion.h1
initial={{ y: -50, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.8 }}
className="text-5xl font-bold mb-6 text-center"
>
Sveikas atvykęs! 🎉
</motion.h1>


<motion.img
  src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
  alt="Juokingas gifas"
  className="rounded-2xl shadow-lg"
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 120 }}
/>


<motion.p
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 1 }}
className="mt-6 text-lg text-gray-700"
>
Čia tavo naujas juokingas pradžios puslapis 😄
</motion.p>
</div>
    )
}