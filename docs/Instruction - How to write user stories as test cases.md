## Instruction: How to write user stories as test cases

### 1. General Principles

| Do                                                                              | Don't                                                                                                                                                                                                                                   |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Describe only what the tester **sees** and **can verify**                        | Do not mention "what happens under the hood" (requests, DB, cache, etc.)                                                                                                                                                              |
| Formulate steps as **actions** and **expected results**                          | Do not describe UI appearance details unless they are crucial.<br>Negative example: blue icon with thin lines and a pencil drawing<br>Instead: control element for switching to edit mode<br><br>Positive example: visually styled as a note field |
| Use **unambiguous, verifiable** wording in the perfective aspect ("text is displayed") | Avoid vague words ("approximately", "should somehow show"...) and imperfective verbs ("is displayed", "is running")                                                                                                               |
| Keep one expected result per step                                                | Do not combine multiple actions and reactions in one line                                                                                                                                                                               |
| Specify only **actions required** for the scenario                               | Do not add actions that do not affect the case goal                                                                                                                                                                                     |
| Maintain a unified template for all cases                                        | Do not change the order and names of sections between cases                                                                                                                                                                             |

### 2. Case Structure

| Section            | Content and Rules                                                                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title**          | `UC-Section-Number — Short name`                                                                                                                                |
| **Precondition**   | Conditions before starting the test in verb form (e.g., "Launch the app", "Ensure a clean start"). If nothing is needed — write "Not required".           |
| **Test Case**      | Table of 2–3 columns:<br>— **Action** (verb infinitive, one action)<br>— **Expectation** (perfective verb, unambiguous, observable result)<br>— **Comment** (optional; clarifications, business rules references) |

#### Table Template

|**Action**|**Expectation**|**Comment**|
|---|---|---|
|||_(optional)_|

### 3. Step Formatting

1. **First step** — launch or entry point (e.g., "Tap the app icon").
2. If you need to specify several expectations for one action, insert an additional "empty" action (`—`) and list expectations in separate rows.
3. **Do not include** in this case actions related to another user flow (e.g., editing, if the case is only about opening).

### 4. Wording Rules

- **Actions**: use verb infinitives ("Tap", "Enter", "Swipe").
- **Expectations**: use perfective verbs ("App launched", "Text displayed", "Screen switched").
- **Exceptions for expectations**: it is allowed to use imperfective form if the process is ongoing (e.g., "Loading in progress", "Animation is displayed").

### 5. Nuances

- **Unique global restrictions** (one entry per day, no future dates, etc.) are mentioned in comments where it is important to check the rule, but **not** repeated in every step.
- If the interface allows different states (e.g., note exists / does not exist) — describe both reaction options in separate rows if a simple reaction is expected for each case. If branching is required, when several subsequent steps depend on the result of a step, you need to create several user cases for each branch. Simple elementary branches can be described in one case.
- Use comments to clarify data formats, time localization, product rules references. 