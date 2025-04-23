
import { Star } from "lucide-react";

interface StarRatingProps {
  score: number; // e.g., 4 out of 5
  outOf?: number; // default 5
  className?: string;
}

export default function StarRating({ score, outOf = 5, className }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-1 ${className || ""}`}>
      {[...Array(outOf)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < score ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
          strokeWidth={i < score ? 1.2 : 1.5}
          fill={i < score ? "currentColor" : "none"}
        />
      ))}
      <span className="ml-1 text-xs text-gray-500">{score}/{outOf}</span>
    </div>
  );
}
