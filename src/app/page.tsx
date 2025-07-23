import Button from "@/components/Button/Button";

export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-blue-700 ">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 bg-red">
        Bienvenido Marco a la Landing de bienvenida
      </h1>
        <Button
        link='/'
        tag= 'Click aca'
        mode= {0}
        height={60}
        width={200}>
        </Button>
    </div>
  );
}