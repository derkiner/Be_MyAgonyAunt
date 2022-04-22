import { Confession, TypeOfConfession, comments, CommentsPosted } from './singleton/assembly/index'

export function addNewConfession(
  nickname: string,
  subject: string,
  category: string,
  details: string,
): Confession {
  return Confession.addConfession(nickname, category, details, subject)
}

export function getConfessionById(id: u32): Confession {
  return Confession.findConfessionById(id)
}

export function getConfessions(offset: u32, limit: u32 = 5): Confession[] {
  return Confession.findConfessions(offset, limit)
}

export function uptodateConfession(
  id: u32,
  type: TypeOfConfession,
): Confession {
  return Confession.getConfessionsByIdAndUpdate(id, type)
}

export function deleteConfession(id: u32): void {
  Confession.findConfessionById_Terminate(id)
}

export function newAdvice(text: string, confessionId: u32): void {
  const advice = new CommentsPosted(text, confessionId)
  comments.push(advice)
}

const totalConfession = 5
export function obtainAdvice(): CommentsPosted[] {
  const quantityOfAdvice = min(totalConfession, comments.length)
  const startIndex = comments.length - quantityOfAdvice
  const outcome = new Array<CommentsPosted>(quantityOfAdvice)
  for (let i = 0; i < quantityOfAdvice; i++) {
    outcome[i] = comments[i + startIndex]
  }
  return outcome
}

export function grabAdviceByCommentId(
  id: i32,
  limit: i32 = 5,
): CommentsPosted[] {
  const totalPieceOfAdvice = min(limit, comments.length)
  const startIndex = comments.length - totalPieceOfAdvice
  const result = new Array<CommentsPosted>(totalPieceOfAdvice)
  for (let y = 0; y < totalPieceOfAdvice; y++) {
    if (comments[y].confessionId == id) {
      result[y] = comments[y + startIndex]
    }
  }
  return result
}
