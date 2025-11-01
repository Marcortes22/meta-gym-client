import ExercisesList from '@/features/exercises/components/exercises-list.component';

export default function ExercisesPage() {
  return (
    <div className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Ejercicios</h1>
          <p className="text-gray-600 mt-2">Catálogo de ejercicios disponibles para las rutinas</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <ExercisesList/>
        </div>
      </div>
    </div>
  );
}
