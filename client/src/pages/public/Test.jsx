import { motion } from "framer-motion";
import { Link } from "react-router";
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
  src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2cwN29zbXd3NWw5OXJ4ZWtuNmVhMzZqNDJndjU3Y3g0OG5jcmVxbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SWoXEoE1lA0uSQcF1h/giphy.gif"
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
Funny Testing
            </motion.p>
        <Link className="btn btn-success" to='/testing/inner'>FLY KILLER</Link>
        <Link className="btn btn-success ms-2" to='/weather/inner'>Weather App</Link>
</div>
    )
}