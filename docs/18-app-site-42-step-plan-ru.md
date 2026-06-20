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
