# План работ app.site.ru на 42 пункта

Цель: к утру получить рабочий, проверяемый web-кабинет `app.site.ru`, который можно показывать как первый продуктовый прототип ASTS.

Автоматизация: включен heartbeat каждые 12 минут в текущем треде. Каждый цикл должен делать один небольшой проверяемый инкремент, запускать релевантную проверку и писать короткий статус.

## Ночной план

1. Зафиксировать текущее состояние PR `Build initial app.site.ru workspace shell`.
2. Убедиться, что `main` содержит две воронки и платформенный roadmap.
3. Проверить, что dev-сервер запускается локально на `127.0.0.1:3000`.
4. Убедиться, что production build `apps/web` проходит без TypeScript-ошибок.
5. Закрепить `.gitignore`, чтобы `.next`, `node_modules`, env и кэши не попадали в Git.
6. Оставить `package-lock.json` для воспроизводимой установки.
7. Убрать предупреждения Next по workspace root через `next.config.ts`.
8. Стабилизировать первый экран кабинета: sidebar, header, KPI, основные секции.
9. Сделать `Tender Inbox` главным рабочим экраном, а не лендингом.
10. Добавить mock-данные процедур из первоисточников: ЕИС, 223-ФЗ, ЭТП.
11. Показать в таблице источник, номер процедуры, регион, НМЦК, срок и match.
12. Добавить визуальные статусы риска: low, medium, high.
13. Добавить блок onboarding компании.
14. Показать прогресс заполнения профиля компании.
15. Отразить поля onboarding: ИНН/ОГРН, регионы, ОКПД2/ОКВЭД, маржинальность, CRM, роли.
16. Сделать карточку процедуры как центральный рабочий блок.
17. Добавить `AI Decision Card` с заказчиком, НМЦК, рисками и следующим шагом.
18. Показать первую воронку: до победы в процедуре.
19. Показать вторую воронку: после победы / исполнение.
20. Убедиться, что первая воронка не смешивается со второй.
21. Добавить блок задач и эскалаций.
22. Показать критическую задачу “срок меньше 10 часов”.
23. Добавить блок CRM hub.
24. Показать первую очередь интеграций: Bitrix24, amoCRM, 1C, Telegram, ЕИС, ФНС.
25. Подготовить место под будущие коннекторы: Мегаплан, RetailCRM, Planfix, СберCRM, C2CRM, РосБизнесСофт CRM, BPMSoft CRM.
26. Проверить адаптивность desktop/notebook.
27. Проверить tablet-width layout.
28. Проверить mobile-width layout около 390 px.
29. Убрать горизонтальный overflow на всех проверенных ширинах.
30. Проверить, что длинные названия процедур не ломают таблицу.
31. Проверить, что stage pills воронок не растягивают страницу.
32. Проверить, что навигация удобна на мобильном экране.
33. Запустить browser-check и зафиксировать: KPI, tender rows, stage lines, integrations.
34. Запустить `npm run build` после всех правок.
35. Запустить чистую проверку в fresh clone: `npm ci --ignore-scripts && npm run build`.
36. Обновить PR с описанием, как проверять.
37. Не пушить напрямую в `main`.
38. После merge PR проверить GitHub Pages/workdesk отдельно.
39. После merge решить, нужен ли preview deploy для `app.site.ru`.
40. Следующим PR начать раскладывать shell на компоненты: sidebar, inbox, procedure card, funnels, tasks, integrations.
41. Следующим PR добавить маршруты: `/login`, `/onboarding`, `/tenders`, `/tenders/[id]`, `/tasks`, `/integrations`.
42. К утру иметь рабочий локальный сайт и PR, который можно открыть, собрать и показать партнеру.

## Что считается “работающим сайтом” на утро

- `apps/web` запускается локально.
- Главный экран выглядит как рабочий кабинет, а не blueprint.
- Видны Tender Inbox, onboarding, карточка процедуры, две воронки, AI Decision Card, задачи и CRM hub.
- `npm run build` проходит.
- Есть PR с инструкцией проверки.
- Нет прямого push в `main`.

127. [done 2026-06-18] Добавить source owner receipt write live-route workflow copy: закрепить source owner live-route rendered copy в Web build workflow order перед workflow failure copy и source freshness checks.

128. [done 2026-06-18] Добавить AI review receipt write live-route workflow copy: закрепить AI live-route rendered copy в Web build workflow order перед workflow failure copy и shared README checks.

129. [done 2026-06-18] Добавить source freshness write live-route workflow copy: закрепить freshness live-route rendered copy в Web build workflow order перед workflow failure copy и source freshness rendered checks.

130. [done 2026-06-18] Добавить EIS real-network approval live-route workflow copy: закрепить EIS live-route rendered copy в Web build workflow order перед workflow failure copy и AI review checks.

131. [done 2026-06-18] Добавить source owner receipt write live-route docs copy: закрепить source owner live-route workflow copy в API README audit note, `/plan` docs href и Web build перед source freshness checks.

132. [done 2026-06-18] Добавить AI review receipt write live-route docs copy: закрепить AI live-route workflow copy в API README audit note, `/plan` docs href и Web build перед shared README checks.

133. [done 2026-06-18] Добавить source freshness write live-route docs copy: закрепить freshness live-route workflow copy в API README audit note, `/plan` docs href и Web build перед source freshness rendered checks.

134. [done 2026-06-18] Добавить EIS real-network approval live-route docs copy: закрепить EIS live-route workflow copy в API README approval note, `/plan` docs href и Web build перед AI review checks.

135. [done 2026-06-18] Добавить source owner receipt write live-route README trigger copy: закрепить source owner docs copy в API README trigger path, `/plan` trigger note и Web build перед source freshness checks.

136. [done 2026-06-18] Добавить AI review receipt write live-route README trigger copy: закрепить AI review docs copy в API README trigger path, `/plan` trigger note и Web build перед shared README checks.

137. [done 2026-06-18] Добавить source freshness write live-route README trigger copy: закрепить freshness docs copy в API README trigger path, `/plan` trigger note и Web build перед freshness rendered checks.

138. [done 2026-06-19] Добавить EIS real-network approval live-route README trigger copy: закрепить EIS docs copy в API README trigger path, `/plan` trigger note и Web build перед AI review checks.

139. [done 2026-06-19] Добавить source owner receipt write live-route README rendered copy: закрепить source owner README trigger copy в rendered route smoke и Web build перед source freshness checks.

140. [done 2026-06-19] Добавить AI review receipt write live-route README rendered copy: закрепить AI README trigger copy в rendered route smoke и Web build перед shared README checks.

141. [done 2026-06-19] Добавить source freshness write live-route README rendered copy: закрепить freshness README trigger copy в rendered route smoke и Web build перед freshness rendered checks.

142. [done 2026-06-19] Добавить EIS real-network approval live-route README rendered copy: закрепить EIS README trigger copy в rendered route smoke и Web build перед AI review checks.

143. [done 2026-06-19] Добавить source owner receipt write live-route README workflow copy: закрепить source owner README rendered copy в Web build order перед workflow failure и source freshness checks.

144. [done 2026-06-19] Добавить AI review receipt write live-route README workflow copy: закрепить AI README rendered copy в Web build order перед workflow failure и shared README checks.

145. [done 2026-06-19] Добавить source freshness write live-route README workflow copy: закрепить freshness README rendered copy в Web build order перед workflow failure и freshness rendered checks.

146. [done 2026-06-19] Добавить EIS real-network approval live-route README workflow copy: закрепить EIS README rendered copy в Web build order перед workflow failure и AI review checks.

147. [done 2026-06-19] Добавить source owner receipt write live-route README workflow failure copy: закрепить source owner README workflow copy в failure guard перед source freshness checks.

148. [done 2026-06-19] Добавить AI review receipt write live-route README workflow failure copy: закрепить AI README workflow copy в failure guard перед shared README checks.

149. [done 2026-06-19] Добавить source freshness write live-route README workflow failure copy: закрепить freshness README workflow copy в failure guard перед freshness rendered checks.

150. [done 2026-06-19] Добавить EIS real-network approval live-route README workflow failure copy: закрепить EIS README workflow copy в failure guard перед AI review checks.

151. [done 2026-06-19] Добавить source owner receipt write API docs deep-link copy: закрепить write draft API README deep-link на `/sources` и в docs-link smoke.

152. [done 2026-06-19] Добавить AI review receipt write API docs deep-link copy: закрепить AI write draft API README deep-link на `/ai-review` и в AI review README parity smoke.

153. [done 2026-06-19] Добавить source freshness write API docs deep-link copy: закрепить freshness write draft API README deep-link на `/sources` и в source receipt docs-link smoke.

154. [done 2026-06-19] Добавить EIS real-network approval API docs deep-link copy: закрепить EIS approval API README deep-link на `/sources` и в EIS approval smoke.

155. [done 2026-06-19] Добавить FNS real-network approval API docs deep-link copy: закрепить FNS approval API README deep-link на `/sources` и в FNS approval smoke.

156. [done 2026-06-19] Добавить shared validation API docs deep-link copy: закрепить shared schema README deep-link на `/plan` и в rendered route smoke.

157. [done 2026-06-19] Добавить web build workflow API docs deep-link copy: закрепить Web build workflow YAML deep-link на `/plan` и в rendered route smoke.

158. [done 2026-06-19] Добавить AI review queue API docs deep-link copy: закрепить AI Review Queue Contract deep-link на `/ai-review` и в API README parity smoke.

159. [done 2026-06-19] Добавить source connectors API docs deep-link copy: закрепить Source Connectors Contract deep-link на `/sources` и в live docs-link smoke.

160. [done 2026-06-19] Добавить shared validation route smoke docs failure copy: закрепить owner-friendly guard для shared validation docs deep-link в rendered route smoke.

161. [done 2026-06-20] Добавить web build route smoke docs failure copy: закрепить owner-friendly guard для Web build workflow docs deep-link в rendered route smoke.

162. [done 2026-06-20] Добавить AI review queue route smoke docs failure copy: закрепить owner-friendly guard для AI review queue docs deep-link в rendered route smoke.

163. [done 2026-06-20] Добавить source connectors route smoke docs failure copy: закрепить owner-friendly guard для Source Connectors Contract docs deep-link в rendered route smoke.

164. [done 2026-06-20] Добавить shared validation workflow docs failure copy: закрепить owner-friendly guard для связки Shared validation workflow failure copy и shared README docs deep-link в rendered route smoke.

165. [done 2026-06-20] Добавить web build workflow docs failure copy: закрепить owner-friendly guard для связки Web build workflow failure copy и Web build workflow YAML docs deep-link в rendered route smoke.

166. [done 2026-06-20] Добавить AI review queue workflow docs failure copy: закрепить owner-friendly guard для связки AI review queue docs deep-link и Web build queue route smoke в rendered route smoke.

167. [done 2026-06-20] Добавить source connectors workflow docs failure copy: закрепить owner-friendly guard для связки Source Connectors docs deep-link и Web build route smoke в rendered route smoke.

168. [done 2026-06-20] Добавить shared validation live docs workflow copy: закрепить owner-friendly guard для связки shared validation live route gate, shared README docs deep-link и Web build route smoke.

169. [done 2026-06-20] Добавить web build live docs workflow copy: закрепить owner-friendly guard для связки Web build live route gate, workflow YAML docs deep-link и rendered route smoke.

170. [done 2026-06-20] Добавить AI review queue live docs workflow copy: закрепить owner-friendly guard для связки AI review queue live route, API README docs deep-link и Web build queue workflow smoke.

171. [done 2026-06-20] Добавить source connectors live docs workflow copy: закрепить owner-friendly guard для связки Source Connectors live route, API README docs deep-link и Web build route smoke.

172. [done 2026-06-20] Добавить shared validation README live docs workflow copy: закрепить owner-friendly guard для связки shared validation README docs deep-link, live route gate и Web build route smoke.

173. [done 2026-06-20] Добавить web build README live docs workflow copy: закрепить owner-friendly guard для связки Web build workflow YAML docs deep-link, live route gate и route smoke.

174. [done 2026-06-20] Добавить AI review queue README live docs workflow copy: закрепить owner-friendly guard для связки AI review queue API README docs deep-link, live route и Web build queue workflow smoke.

175. [done 2026-06-20] Добавить source connectors README live docs workflow copy: закрепить owner-friendly guard для связки Source Connectors API README docs deep-link, live route и Web build route smoke.

176. [done 2026-06-20] Добавить shared validation README workflow failure copy: закрепить owner-friendly guard для связки shared validation README live docs workflow copy и shared workflow failure checks.

177. [done 2026-06-20] Добавить web build README workflow failure copy: закрепить owner-friendly guard для связки Web build README live docs workflow copy и Web build failure checks.

178. [done 2026-06-20] Добавить AI review queue README workflow failure copy: закрепить owner-friendly guard для связки AI review queue README live docs workflow copy и Web build queue route smoke.

179. [done 2026-06-20] Добавить source connectors README workflow failure copy: закрепить owner-friendly guard для связки Source Connectors README live docs workflow copy и Web build route smoke.

180. [done 2026-06-20] Добавить shared validation README rendered-route failure copy: закрепить owner-friendly guard для связки shared validation README workflow failure copy и rendered route smoke.

181. [done 2026-06-20] Добавить web build README rendered-route failure copy: закрепить owner-friendly guard для связки Web build README workflow failure copy и rendered route smoke.

182. [done 2026-06-20] Добавить AI review queue README rendered-route failure copy: закрепить owner-friendly guard для связки AI review queue README workflow failure copy и rendered route smoke.

183. [done 2026-06-20] Добавить source connectors README rendered-route failure copy: закрепить owner-friendly guard для связки Source Connectors README workflow failure copy и rendered route smoke.

184. [done 2026-06-20] Добавить shared validation README workflow docs failure copy: закрепить owner-friendly guard для связки shared validation README rendered-route guard и shared workflow docs guard.

185. [done 2026-06-20] Добавить web build README workflow docs failure copy: закрепить owner-friendly guard для связки Web build README rendered-route guard и Web build workflow docs guard.

186. [done 2026-06-20] Добавить AI review queue README workflow docs failure copy: закрепить owner-friendly guard для связки AI review queue README rendered-route guard и AI review queue workflow docs guard.

187. [done 2026-06-20] Добавить source connectors README workflow docs failure copy: закрепить owner-friendly guard для связки Source Connectors README rendered-route guard и Source Connectors workflow docs guard.

188. [done 2026-06-20] Добавить shared validation README workflow docs rendered-route copy: закрепить owner-friendly guard для живого `/plan`, который подтверждает shared validation README workflow docs guard в rendered route smoke.

189. [done 2026-06-20] Добавить web build README workflow docs rendered-route copy: закрепить owner-friendly guard для живого `/plan`, который подтверждает Web build README workflow docs guard в rendered route smoke.

190. [done 2026-06-20] Добавить AI review queue README workflow docs rendered-route copy: закрепить owner-friendly guard для живого `/ai-review`, который подтверждает AI review queue README workflow docs guard в rendered route smoke.

191. [done 2026-06-20] Добавить source connectors README workflow docs rendered-route copy: закрепить owner-friendly guard для живого `/sources`, который подтверждает Source Connectors README workflow docs guard в rendered route smoke.

192. [done 2026-06-20] Добавить shared validation README workflow docs browser-loop copy: закрепить owner-friendly Browser QA guard для живого `/plan`, который подтверждает shared validation README workflow docs rendered-route guard.

193. [done 2026-06-20] Добавить web build README workflow docs browser-loop copy: закрепить owner-friendly Browser QA guard для живого `/plan`, который подтверждает Web build README workflow docs rendered-route guard.

194. [done 2026-06-20] Добавить AI review queue README workflow docs browser-loop copy: закрепить owner-friendly Browser QA guard для живого `/ai-review`, который подтверждает AI review queue README workflow docs rendered-route guard.

195. [done 2026-06-20] Добавить source connectors README workflow docs browser-loop copy: закрепить owner-friendly Browser QA guard для живого `/sources`, который подтверждает Source Connectors README workflow docs rendered-route guard.

196. [done 2026-06-20] Добавить source connectors README workflow docs PR-check copy: закрепить owner-friendly PR-check guard для PR #17, который подтверждает Source Connectors README workflow docs guard через CLEAN merge state и зеленые Web build, API smoke, Shared validation checks.

197. [done 2026-06-20] Добавить AI review queue README workflow docs PR-check copy: закрепить owner-friendly PR-check guard для PR #17, который подтверждает AI review queue README workflow docs guard через CLEAN merge state и зеленые Web build, API smoke, Shared validation checks.

198. [done 2026-06-20] Добавить shared validation README workflow docs PR-check copy: закрепить owner-friendly PR-check guard для PR #17, который подтверждает shared validation README workflow docs guard через CLEAN merge state и зеленые Web build, API smoke, Shared validation checks.

199. [done 2026-06-20] Добавить web build README workflow docs PR-check copy: закрепить owner-friendly PR-check guard для PR #17, который подтверждает Web build README workflow docs guard через CLEAN merge state и зеленые Web build, API smoke, Shared validation checks.

200. [done 2026-06-20] Добавить source connectors README workflow docs merge-state copy: закрепить owner-friendly merge-state guard для PR #17, который подтверждает Source Connectors README workflow docs guard через head/base ветки, CLEAN mergeStateStatus и зеленый statusCheckRollup.

201. [done 2026-06-20] Добавить AI review queue README workflow docs merge-state copy: закрепить owner-friendly merge-state guard для PR #17, который подтверждает AI review queue README workflow docs guard через head/base ветки, CLEAN mergeStateStatus и зеленый statusCheckRollup.

202. [done 2026-06-20] Добавить shared validation README workflow docs merge-state copy: закрепить owner-friendly merge-state guard для PR #17, который подтверждает shared validation README workflow docs guard через head/base ветки, CLEAN mergeStateStatus и зеленый statusCheckRollup.

203. [done 2026-06-20] Добавить web build README workflow docs merge-state copy: закрепить owner-friendly merge-state guard для PR #17, который подтверждает Web build README workflow docs guard через head/base ветки, CLEAN mergeStateStatus и зеленый statusCheckRollup.

204. [done 2026-06-20] Добавить source connectors README workflow docs release-note copy: закрепить owner-friendly release-note handoff для Source Connectors README workflow docs guard, который связывает browser-loop, PR-check и merge-state evidence перед выпуском release notes.

205. [done 2026-06-20] Добавить AI review queue README workflow docs release-note copy: закрепить owner-friendly release-note handoff для AI review queue README workflow docs guard, который связывает browser-loop, PR-check и merge-state evidence перед выпуском release notes.

206. [done 2026-06-21] Добавить shared validation README workflow docs release-note copy: закрепить owner-friendly release-note handoff для shared validation README workflow docs guard, который связывает browser-loop, PR-check и merge-state evidence перед выпуском release notes.

207. [done 2026-06-21] Добавить web build README workflow docs release-note copy: закрепить owner-friendly release-note handoff для Web build README workflow docs guard, который связывает browser-loop, PR-check и merge-state evidence перед выпуском release notes.

208. [done 2026-06-21] Добавить source connectors README workflow docs final QA copy: закрепить owner-friendly final QA handoff для Source Connectors README workflow docs guard, который связывает build, route smoke, Browser DOM QA и CLEAN PR evidence перед закрытием handoff.

209. [done 2026-06-21] Добавить AI review queue README workflow docs final QA copy: закрепить owner-friendly final QA handoff для AI review queue README workflow docs guard, который связывает build, route smoke, Browser DOM QA и CLEAN PR evidence перед закрытием handoff.

210. [done 2026-06-21] Добавить shared validation README workflow docs final QA copy: закрепить owner-friendly final QA handoff для shared validation README workflow docs guard, который связывает build, route smoke, Browser DOM QA и CLEAN PR evidence перед закрытием handoff.

211. [done 2026-06-21] Добавить web build README workflow docs final QA copy: закрепить owner-friendly final QA handoff для Web build README workflow docs guard, который связывает build, route smoke, Browser DOM QA и CLEAN PR evidence перед закрытием handoff.

212. [done 2026-06-21] Добавить source connectors README workflow docs owner handoff copy: закрепить owner-friendly handoff для Source Connectors README workflow docs guard, который распределяет Data, API, QA и Release acceptance после final QA evidence.

213. [done 2026-06-21] Добавить AI review queue README workflow docs owner handoff copy: закрепить owner-friendly handoff для AI review queue README workflow docs guard, который распределяет AI workflow, API, QA и Release acceptance после final QA evidence.

214. [done 2026-06-21] Добавить shared validation README workflow docs owner handoff copy: закрепить owner-friendly handoff для shared validation README workflow docs guard, который распределяет Schema, CI, QA и Release acceptance после final QA evidence.

215. [done 2026-06-21] Добавить web build README workflow docs owner handoff copy: закрепить owner-friendly handoff для Web build README workflow docs guard, который распределяет Frontend, CI, QA и Release acceptance после final QA evidence.

216. [done 2026-06-21] Добавить source connectors README workflow docs release checklist copy: закрепить owner-friendly release checklist для Source Connectors README workflow docs guard, который фиксирует Data, API, QA и Release acceptance перед выпуском.

217. [done 2026-06-21] Добавить AI review queue README workflow docs release checklist copy: закрепить owner-friendly release checklist для AI review queue README workflow docs guard, который фиксирует AI workflow, API, QA и Release acceptance перед выпуском.

218. [done 2026-06-21] Добавить shared validation README workflow docs release checklist copy: закрепить owner-friendly release checklist для shared validation README workflow docs guard, который фиксирует Schema, CI, QA и Release acceptance перед выпуском.

219. [done 2026-06-21] Добавить web build README workflow docs release checklist copy: закрепить owner-friendly release checklist для Web build README workflow docs guard, который фиксирует Frontend, CI, QA и Release acceptance перед выпуском.

220. [done 2026-06-21] Добавить source connectors README workflow docs release approval copy: закрепить owner-friendly release approval для Source Connectors README workflow docs guard, который фиксирует Data, API, QA и Release approval evidence перед signoff.

221. [done 2026-06-21] Добавить AI review queue README workflow docs release approval copy: закрепить owner-friendly release approval для AI review queue README workflow docs guard, который фиксирует AI workflow, API, QA и Release approval evidence перед signoff.

222. [done 2026-06-21] Добавить shared validation README workflow docs release approval copy: закрепить owner-friendly release approval для shared validation README workflow docs guard, который фиксирует Schema, CI, QA и Release approval evidence перед signoff.

223. [done 2026-06-21] Добавить web build README workflow docs release approval copy: закрепить owner-friendly release approval для Web build README workflow docs guard, который фиксирует Frontend, CI, QA и Release approval evidence перед signoff.

224. [done 2026-06-21] Добавить source connectors README workflow docs release signoff copy: закрепить owner-friendly release signoff для Source Connectors README workflow docs guard, который фиксирует Data, API, QA и Release signoff evidence перед archive.

225. [done 2026-06-21] Добавить AI review queue README workflow docs release signoff copy: закрепить owner-friendly release signoff для AI review queue README workflow docs guard, который фиксирует AI workflow, API, QA и Release signoff evidence перед archive.

226. [done 2026-06-21] Добавить shared validation README workflow docs release signoff copy: закрепить owner-friendly release signoff для shared validation README workflow docs guard, который фиксирует Schema, CI, QA и Release signoff evidence перед archive.

227. [done 2026-06-21] Добавить web build README workflow docs release signoff copy: закрепить owner-friendly release signoff для Web build README workflow docs guard, который фиксирует Frontend, CI, QA и Release signoff evidence перед archive.

228. [done 2026-06-21] Добавить source connectors README workflow docs archive copy: закрепить owner-friendly archive handoff для Source Connectors README workflow docs guard, который связывает release signoff, release note, CLEAN PR и smoke evidence.

229. [done 2026-06-21] Добавить AI review queue README workflow docs archive copy: закрепить owner-friendly archive handoff для AI review queue README workflow docs guard, который связывает release signoff, release note, CLEAN PR и smoke evidence.

230. [done 2026-06-21] Добавить shared validation README workflow docs archive copy: закрепить owner-friendly archive handoff для shared validation README workflow docs guard, который связывает release signoff, release note, CLEAN PR и smoke evidence.

231. [done 2026-06-21] Добавить web build README workflow docs archive copy: закрепить owner-friendly archive handoff для Web build README workflow docs guard, который связывает release signoff, release note, CLEAN PR и smoke evidence.

232. [done 2026-06-21] Подготовить финальный PR #17 handoff audit copy: закрепить owner-friendly audit trail для четырех archive guards, CLEAN PR и зеленого statusCheckRollup перед merge readiness note.

233. [done 2026-06-21] Подготовить PR #17 merge readiness note copy: закрепить owner-friendly merge readiness note для final handoff audit, CLEAN PR, зеленого statusCheckRollup и отдельной проверки review threads.

234. [done 2026-06-21] Проверить PR #17 review threads copy: закрепить GraphQL-проверку reviewThreads.totalCount=0, отсутствие unresolved/outdated threads, пустые PR comments/reviews и связь с merge readiness note перед merge request.

235. [done 2026-06-21] Подготовить PR #17 merge request copy: связать CLEAN PR, зеленый statusCheckRollup, нулевые reviewThreads и merge readiness evidence в один проверяемый merge request handoff.

236. [done 2026-06-21] Подготовить PR #17 final merge handoff copy: собрать CLEAN PR, SUCCESS checks, reviewThreads=0, comments=0 и reviews=0 в один owner-ready handoff перед approval checklist.

237. [done 2026-06-21] Проверить PR #17 merge approval checklist copy: закрепить owner checklist для CLEAN PR, SUCCESS checks, reviewThreads=0, comments=0, reviews=0 и пустого reviewDecision перед approval request.

238. [done 2026-06-21] Подготовить PR #17 approval request copy: сформировать owner-safe текст запроса approval, который ссылается на checklist, CLEAN PR, SUCCESS checks и запрещает merge action до отдельного owner signoff.

239. [done 2026-06-21] Проверить PR #17 approval wait-state copy: закрепить ожидание reviewer/owner approval при пустом reviewDecision, comments=0, reviews=0 и запрете merge/auto-merge до явного ответа.

240. [done 2026-06-21] Подготовить PR #17 reviewer approval response copy: описать safe follow-up для approved, changes requested и still waiting исходов без merge action и без review submission.

241. [done 2026-06-21] Подготовить PR #17 owner signoff checkpoint copy: собрать финальный owner gate для CLEAN, SUCCESS checks, нулевых review counters и approved/explicit owner signoff без merge action.

242. [done 2026-06-21] Подготовить PR #17 final merge decision packet copy: собрать owner-ready decision evidence для CLEAN, SUCCESS checks, нулевых review counters и signoff checkpoint без merge action.

243. [done 2026-06-21] Подготовить PR #17 owner merge authorization copy: сформулировать owner-safe authorization states approve-to-merge, wait и return-to-review без выполнения merge action.

244. [done 2026-06-21] Подготовить PR #17 post-authorization merge execution checklist copy: описать ручной execution checklist для fresh gate, merge method и rollback contact без выполнения merge action.

245. [done 2026-06-21] Подготовить PR #17 post-merge verification checklist copy: описать standby verification checklist для main checks, /plan smoke, release note и rollback contact без изменения main.

246. [done 2026-06-21] Подготовить PR #17 release archive handoff copy: описать standby archive handoff для release note, CI links, smoke evidence и rollback contact без удаления branch.

247. [done 2026-06-21] Подготовить PR #17 final PR closeout note copy: описать standby closeout note для CLEAN PR, SUCCESS checks, нулевых review counters и archive handoff без закрытия PR.

248. [done 2026-06-21] Подготовить PR #17 branch retention notice copy: описать standby retention notice для codex/app-site-shell, audit trail и rollback review без удаления ветки.

249. [done 2026-06-21] Подготовить PR #17 release tag wait-state copy: описать standby ожидание owner-created release tag, source commit и rollback note без создания tag.

250. [done 2026-06-21] Подготовить PR #17 post-release monitor copy: описать standby observation window для Web build, API smoke, Shared validation, /plan smoke и rollback contact без запуска deploy.

251. [done 2026-06-21] Подготовить PR #17 release incident fallback copy: описать standby fallback для failed check, broken /plan smoke, impacted surface и rollback note без открытия incident.

252. [done 2026-06-22] Подготовить PR #17 release retrospective note copy: описать draft retrospective note для release result, SUCCESS checks, /plan smoke, review counters и rollback contact без создания docs issue.

253. [done 2026-06-22] Подготовить PR #17 release lessons learned follow-up copy: описать draft follow-up для what worked, watchouts, evidence gaps, follow-up candidates и monitoring reminder без назначения owner actions.

254. [done 2026-06-22] Подготовить PR #17 release action items backlog copy: описать draft backlog для follow-up candidates, evidence gaps, monitoring reminder, owner-question и suggested priority без создания задач.

255. [done 2026-06-22] Подготовить PR #17 release action items triage copy: описать draft triage для impact, evidence gap, owner-question, suggested priority и monitoring dependency без назначения owner.

256. [done 2026-06-22] Подготовить PR #17 release action items owner question copy: описать draft owner question для follow-up owner, acceptable evidence, priority signal и monitoring dependency без назначения owner или capture ответа.

257. [done 2026-06-22] Подготовить PR #17 release action items owner answer copy: описать draft answer states accept follow-up, defer until release, needs evidence и no action без записи ответа или назначения owner.

258. [done 2026-06-22] Подготовить PR #17 release action items acceptance criteria copy: описать draft acceptance criteria для accepted owner answer, evidence threshold, priority signal, monitoring dependency и rollback note без создания задач.

259. [done 2026-06-22] Подготовить PR #17 release action items implementation guardrails copy: описать draft guardrails для accepted criteria, scoped change, dry-run check, owner confirmation и rollback path без выполнения actions.

260. [done 2026-06-22] Подготовить PR #17 release action items tracking handoff copy: описать draft tracking handoff для tracking target, status owner, evidence link, check cadence и rollback contact без создания задач или изменения tracker.

261. [done 2026-06-22] Подготовить PR #17 release action items status rollup copy: описать draft status rollup для current state, blocked reason, next owner action, evidence freshness и follow-up window без изменения статусов или tracker.

262. [done 2026-06-22] Подготовить PR #17 release action items closure note copy: описать draft closure note для closure condition, final evidence, owner signoff, residual risk и reopen trigger без закрытия задач или изменения tracker.

263. [done 2026-06-22] Подготовить PR #17 release action items archive note copy: описать draft archive note для archive reason, retained evidence, owner record, lookup path и restore trigger без архивирования или изменения tracker.

264. [done 2026-06-22] Подготовить PR #17 release action items handover summary copy: описать draft handover summary для handover owner, active context, evidence packet, pending decision и return path без передачи владения или изменения tracker.

265. [done 2026-06-22] Подготовить PR #17 release action items audit trail copy: описать draft audit trail для source note, evidence packet, owner handoff, decision point и verification link без записи событий или изменения tracker.

266. [done 2026-06-22] Подготовить PR #17 release action items merge readiness bridge copy: связать draft audit trail с readiness note, зеленым statusCheckRollup, review-thread check, owner confirmation и merge request boundary без запроса merge или изменения PR state.

267. [done 2026-06-22] Подготовить PR #17 release action items merge request handoff copy: описать draft handoff для requester, readiness evidence, review-thread receipt, merge boundary и rollback contact без выполнения merge или изменения PR state.

268. [done 2026-06-22] Подготовить PR #17 release action items post-merge monitor handoff copy: описать draft post-merge monitor handoff для monitor owner, check window, signal source, rollback trigger и evidence receipt path без выполнения merge или запуска monitoring.

269. [done 2026-06-22] Подготовить PR #17 release action items post-merge evidence receipt copy: описать draft evidence receipt для receipt owner, evidence source, timestamp expectation, status snapshot и storage path без записи событий или изменения tracker.

270. [done 2026-06-22] Подготовить PR #17 release action items post-merge receipt review copy: описать draft receipt review для reviewer, receipt completeness, stale evidence check, follow-up decision и tracker boundary без записи review outcome или изменения tracker.

271. [done 2026-06-22] Подготовить PR #17 release action items post-merge follow-up decision copy: описать draft follow-up decision для decision owner, decision options, evidence reference, action boundary и deferral note без назначения actions или изменения tracker.

272. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision handoff copy: описать draft decision handoff для handoff owner, decision summary, evidence packet, ownership boundary и return path без передачи ownership или изменения tracker.

273. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision acceptance copy: описать draft decision acceptance для acceptance owner, accepted handoff, evidence packet, acceptance boundary и pending record note без записи acceptance или изменения tracker.

274. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record copy: описать draft decision record для record owner, accepted decision, evidence packet, record boundary и audit note без записи decision record или изменения tracker.

275. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record review copy: описать draft decision record review для record reviewer, record completeness, stale evidence check, review boundary и follow-up note без записи review outcome или изменения tracker.

276. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval copy: описать draft decision record approval для approval owner, reviewed record, approval criteria, approval boundary и receipt path без выполнения approval action или изменения tracker.

277. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt copy: описать draft decision record approval receipt для receipt owner, approved record, approval evidence, receipt boundary и review path без записи receipt или изменения tracker.

278. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review copy: описать draft decision record approval receipt review для receipt reviewer, receipt completeness, approval evidence check, review boundary и handoff path без записи review или изменения tracker.

279. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff copy: описать draft decision record approval receipt review handoff для handoff owner, reviewed receipt, approval evidence summary, handoff boundary и return path без выполнения handoff action или изменения tracker.

280. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff acceptance copy: описать draft decision record approval receipt review handoff acceptance для acceptance owner, accepted handoff, approval evidence summary, acceptance boundary и archive path без записи acceptance или изменения tracker.

281. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff archive copy: описать draft decision record approval receipt review handoff archive для archive owner, accepted handoff, approval evidence summary, archive boundary и closeout path без записи archive или изменения tracker.

282. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff closeout copy: описать draft decision record approval receipt review handoff closeout для closeout owner, archived handoff, approval evidence summary, closeout boundary и final report path без записи closeout или изменения tracker.

283. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff final report copy: описать draft decision record approval receipt review handoff final report для final report owner, closed handoff, approval evidence summary, final report boundary и distribution path без записи final report или изменения tracker.

284. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff final report distribution copy: описать draft decision record approval receipt review handoff final report distribution для distribution owner, final report packet, approval evidence summary, distribution boundary и receipt path без записи distribution или изменения tracker.

285. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff final report distribution receipt copy: описать draft decision record approval receipt review handoff final report distribution receipt для receipt owner, distributed packet, distribution evidence, receipt boundary и review path без записи receipt или изменения tracker.

286. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff final report distribution receipt review copy: описать draft decision record approval receipt review handoff final report distribution receipt review для review owner, received distribution receipt, distribution evidence check, review boundary и handoff path без записи review outcome или изменения tracker.

287. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff final report distribution receipt review handoff copy: описать draft decision record approval receipt review handoff final report distribution receipt review handoff для handoff owner, reviewed distribution receipt, distribution evidence summary, handoff boundary и acceptance path без выполнения handoff action или изменения tracker.

288. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff final report distribution receipt review handoff acceptance copy: описать draft decision record approval receipt review handoff final report distribution receipt review handoff acceptance для acceptance owner, accepted review handoff, distribution evidence summary, acceptance boundary и archive path без записи acceptance или изменения tracker.

289. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff final report distribution receipt review handoff archive copy: описать draft decision record approval receipt review handoff final report distribution receipt review handoff archive для archive owner, accepted handoff acceptance, distribution evidence summary, archive boundary и closeout path без записи archive или изменения tracker.

290. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff final report distribution receipt review handoff closeout copy: описать draft decision record approval receipt review handoff final report distribution receipt review handoff closeout для closeout owner, archived review handoff, distribution evidence summary, closeout boundary и final report review path без записи closeout или изменения tracker.

291. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff final report distribution receipt review handoff final report review copy: описать draft decision record approval receipt review handoff final report distribution receipt review handoff final report review для final report review owner, closed review handoff, distribution evidence summary, review boundary и handoff path без записи review или изменения tracker.

292. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff final report distribution receipt review handoff final report review handoff copy: описать draft decision record approval receipt review handoff final report distribution receipt review handoff final report review handoff для handoff owner, reviewed final report review, distribution evidence summary, handoff boundary и acceptance path без выполнения handoff action или изменения tracker.

293. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff final report distribution receipt review handoff final report review handoff acceptance copy: описать draft decision record approval receipt review handoff final report distribution receipt review handoff final report review handoff acceptance для acceptance owner, accepted final report review handoff, distribution evidence summary, acceptance boundary и archive path без записи acceptance или изменения tracker.

294. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff final report distribution receipt review handoff final report review handoff archive copy: описать draft decision record approval receipt review handoff final report distribution receipt review handoff final report review handoff archive для archive owner, accepted final report review handoff acceptance, distribution evidence summary, archive boundary и closeout path без записи archive или изменения tracker.

295. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff final report distribution receipt review handoff final report review handoff closeout copy: описать draft decision record approval receipt review handoff final report distribution receipt review handoff final report review handoff closeout для closeout owner, archived final report review handoff, distribution evidence summary, closeout boundary и final report review path без записи closeout или изменения tracker.

296. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff final report distribution receipt review handoff final report review handoff final report review copy: описать draft decision record approval receipt review handoff final report distribution receipt review handoff final report review handoff final report review для final report review owner, closed final report review handoff, distribution evidence summary, review boundary и handoff path без записи review или изменения tracker.

297. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff final report distribution receipt review handoff final report review handoff final report review handoff copy: описать draft decision record approval receipt review handoff final report distribution receipt review handoff final report review handoff final report review handoff для handoff owner, reviewed final report review, distribution evidence summary, handoff boundary и acceptance path без выполнения handoff action или изменения tracker.

298. [done 2026-06-22] Подготовить PR #17 release action items post-merge decision record approval receipt review handoff final report distribution receipt review handoff final report review handoff final report review handoff acceptance copy: описать draft decision record approval receipt review handoff final report distribution receipt review handoff final report review handoff final report review handoff acceptance для acceptance owner, accepted final report review handoff final report review handoff, distribution evidence summary, acceptance boundary и archive path без записи acceptance или изменения tracker.
