const skillCategories = [
  { category: "Mobile Development", skills: ["Flutter", "Firebase", "Dart"] },
  { category: "Frontend", skills: ["React", "Next.js", "TypeScript", "Vite"] },
  { category: "Backend", skills: ["Node.js", "Express.js", "Python", "FastAPI"] },
  { category: "Database", skills: ["MongoDB", "PostgreSQL", "Firebase Firestore"] },
  { category: "Tools", skills: ["Git", "Figma", "Postman", "Android Studio"] },
]

function SkillsSection() {
  return (
    <div className="skills-list">
      {skillCategories.map((cat, i) => (
        <div key={i} className="skill-row">
          <span className="skill-category">{cat.category}</span>
          <span className="skill-divider"> – </span>
          <span className="skill-items">{cat.skills.join(", ")}</span>
        </div>
      ))}
    </div>
  )
}

export default SkillsSection