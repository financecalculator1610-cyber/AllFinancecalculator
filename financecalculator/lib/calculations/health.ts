// ============================================================
// HEALTH CALCULATION LIBRARY
// ============================================================

/** BMI Calculator */
export function calculateBMI(weightKg: number, heightCm: number) {
  const heightM = heightCm / 100
  const bmi = weightKg / (heightM * heightM)
  let category = '', color = ''
  if (bmi < 18.5) { category = 'Underweight'; color = '#3b82f6' }
  else if (bmi < 25) { category = 'Normal Weight'; color = '#22c55e' }
  else if (bmi < 30) { category = 'Overweight'; color = '#f59e0b' }
  else { category = 'Obese'; color = '#ef4444' }
  const idealWeightMin = 18.5 * heightM * heightM
  const idealWeightMax = 24.9 * heightM * heightM
  return { bmi: parseFloat(bmi.toFixed(1)), category, color, idealWeightMin: parseFloat(idealWeightMin.toFixed(1)), idealWeightMax: parseFloat(idealWeightMax.toFixed(1)) }
}

/** BMR Calculator (Mifflin-St Jeor) */
export function calculateBMR(weightKg: number, heightCm: number, age: number, gender: 'male' | 'female') {
  const bmr = gender === 'male'
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161
  return {
    bmr: Math.round(bmr),
    sedentary: Math.round(bmr * 1.2),
    lightlyActive: Math.round(bmr * 1.375),
    moderatelyActive: Math.round(bmr * 1.55),
    veryActive: Math.round(bmr * 1.725),
    extraActive: Math.round(bmr * 1.9),
  }
}

/** Calorie Calculator */
export function calculateCalories(weightKg: number, heightCm: number, age: number, gender: 'male' | 'female', activityLevel: number, goal: 'loss' | 'maintain' | 'gain') {
  const bmrData = calculateBMR(weightKg, heightCm, age, gender)
  const tdee = bmrData.bmr * activityLevel
  return {
    bmr: bmrData.bmr,
    tdee: Math.round(tdee),
    weightLoss: Math.round(tdee - 500),
    aggressiveLoss: Math.round(tdee - 1000),
    weightGain: Math.round(tdee + 500),
    maintenance: Math.round(tdee),
    macros: {
      protein: Math.round(weightKg * 2.2),
      carbs: Math.round((tdee * 0.45) / 4),
      fat: Math.round((tdee * 0.30) / 9),
    }
  }
}

/** Body Fat Calculator (US Navy Method) */
export function calculateBodyFat(gender: 'male' | 'female', weightKg: number, heightCm: number, waistCm: number, neckCm: number, hipCm?: number) {
  let bodyFat = 0
  if (gender === 'male') {
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450
  } else if (hipCm) {
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450
  }
  bodyFat = Math.max(3, Math.min(50, bodyFat))
  const fatMass = weightKg * bodyFat / 100
  const leanMass = weightKg - fatMass
  let category = ''
  if (gender === 'male') {
    if (bodyFat < 6) category = 'Essential Fat'
    else if (bodyFat < 14) category = 'Athletic'
    else if (bodyFat < 18) category = 'Fitness'
    else if (bodyFat < 25) category = 'Average'
    else category = 'Obese'
  } else {
    if (bodyFat < 14) category = 'Essential Fat'
    else if (bodyFat < 21) category = 'Athletic'
    else if (bodyFat < 25) category = 'Fitness'
    else if (bodyFat < 32) category = 'Average'
    else category = 'Obese'
  }
  return { bodyFat: parseFloat(bodyFat.toFixed(1)), fatMass: parseFloat(fatMass.toFixed(1)), leanMass: parseFloat(leanMass.toFixed(1)), category }
}

/** Ideal Weight Calculator */
export function calculateIdealWeight(heightCm: number, gender: 'male' | 'female', age: number) {
  const heightIn = heightCm / 2.54
  const basePound = gender === 'male' ? 106 : 100
  const hamwiKg = (basePound + 6 * (heightIn - 60)) * 0.453592
  const robinsonKg = gender === 'male' ? 52 + 1.9 * (heightIn - 60) : 49 + 1.7 * (heightIn - 60)
  const millerKg = gender === 'male' ? 56.2 + 1.41 * (heightIn - 60) : 53.1 + 1.36 * (heightIn - 60)
  const bmiMin = 18.5 * Math.pow(heightCm / 100, 2)
  const bmiMax = 24.9 * Math.pow(heightCm / 100, 2)
  return {
    hamwi: parseFloat(hamwiKg.toFixed(1)),
    robinson: parseFloat(robinsonKg.toFixed(1)),
    miller: parseFloat(millerKg.toFixed(1)),
    bmiMin: parseFloat(bmiMin.toFixed(1)),
    bmiMax: parseFloat(bmiMax.toFixed(1)),
    recommended: parseFloat(((hamwiKg + robinsonKg + millerKg) / 3).toFixed(1)),
  }
}

/** Water Intake Calculator */
export function calculateWaterIntake(weightKg: number, activityMinutes: number, climate: 'temperate' | 'hot' | 'cold') {
  const baseIntakeMl = weightKg * 35
  const activityExtra = activityMinutes * 5
  const climateMultiplier = climate === 'hot' ? 1.2 : climate === 'cold' ? 0.9 : 1
  const totalMl = (baseIntakeMl + activityExtra) * climateMultiplier
  const glasses = totalMl / 240
  return { totalMl: Math.round(totalMl), totalLiters: parseFloat((totalMl / 1000).toFixed(1)), glasses: parseFloat(glasses.toFixed(1)), baseIntakeMl: Math.round(baseIntakeMl), activityExtra: Math.round(activityExtra) }
}

/** Protein Intake Calculator */
export function calculateProteinIntake(weightKg: number, activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'athlete', goal: 'maintain' | 'build' | 'lose') {
  const multipliers: Record<string, number> = { sedentary: 0.8, light: 1.0, moderate: 1.2, active: 1.4, athlete: 1.7 }
  const goalMultipliers: Record<string, number> = { maintain: 1, build: 1.3, lose: 1.2 }
  const baseProtein = weightKg * multipliers[activityLevel] * goalMultipliers[goal]
  return {
    minimum: Math.round(weightKg * 0.8),
    recommended: Math.round(baseProtein),
    maximum: Math.round(weightKg * 2.2),
    perMeal: Math.round(baseProtein / 4),
    caloriesFromProtein: Math.round(baseProtein * 4),
  }
}

/** Pregnancy Due Date Calculator */
export function calculatePregnancyDueDate(lmpDate: Date) {
  const dueDate = new Date(lmpDate)
  dueDate.setDate(dueDate.getDate() + 280)
  const today = new Date()
  const gestationalAgeDays = Math.max(0, Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24)))
  const gestationalWeeks = Math.floor(gestationalAgeDays / 7)
  const gestationalDays = gestationalAgeDays % 7
  const trimester = gestationalWeeks < 13 ? 1 : gestationalWeeks < 27 ? 2 : 3
  const daysLeft = Math.max(0, Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
  return { dueDate, gestationalWeeks, gestationalDays, trimester, daysLeft }
}

/** Ovulation Calculator */
export function calculateOvulation(lastPeriodDate: Date, cycleLength: number) {
  const ovulationDay = cycleLength - 14
  const ovulationDate = new Date(lastPeriodDate)
  ovulationDate.setDate(ovulationDate.getDate() + ovulationDay)
  const fertileStart = new Date(ovulationDate)
  fertileStart.setDate(fertileStart.getDate() - 5)
  const fertileEnd = new Date(ovulationDate)
  fertileEnd.setDate(fertileEnd.getDate() + 1)
  const nextPeriod = new Date(lastPeriodDate)
  nextPeriod.setDate(nextPeriod.getDate() + cycleLength)
  return { ovulationDate, fertileStart, fertileEnd, nextPeriod }
}

/** Sleep Cycle Calculator */
export function calculateSleepCycle(bedtime: string, wakeGoal: 'wake' | 'bed') {
  const [h, m] = bedtime.split(':').map(Number)
  const fallAsleepMinutes = 14
  const cycleMinutes = 90
  const results = []
  for (let cycles = 4; cycles <= 6; cycles++) {
    const totalMinutes = cycles * cycleMinutes + (wakeGoal === 'wake' ? fallAsleepMinutes : 0)
    const targetH = h + Math.floor((m + (wakeGoal === 'wake' ? totalMinutes : -totalMinutes)) / 60)
    const targetM = (m + (wakeGoal === 'wake' ? totalMinutes : -totalMinutes)) % 60
    const adjustedH = ((targetH % 24) + 24) % 24
    const adjustedM = ((targetM % 60) + 60) % 60
    results.push({
      cycles,
      hours: (cycles * cycleMinutes) / 60,
      time: `${String(adjustedH).padStart(2, '0')}:${String(adjustedM).padStart(2, '0')}`,
      quality: cycles === 5 ? 'Optimal' : cycles === 6 ? 'Excellent' : 'Good'
    })
  }
  return { results, recommendation: results[1] }
}
