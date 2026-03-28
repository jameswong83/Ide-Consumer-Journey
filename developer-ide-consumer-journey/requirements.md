# Requirements Document

## Introduction

An interactive, web-based consumer journey map that visualizes the end-to-end experience of a developer researching, evaluating, selecting, and using an AI-powered IDE tool (e.g., Kiro, Cursor, Claude Code, GitHub Copilot, Cline, TRAE, Antigravity). The tool is designed for Marketing Managers and Directors at AWS who are themselves developers, enabling them to explore developer pain points, motivations, messaging opportunities, and media touchpoints at each stage of the journey. The experience must be navigable, filterable, and visually engaging — functioning as a strategic reference artifact for marketing planning. The application is delivered as a hosted React web application styled to reflect Initiative and IPG Media brand guidelines.

## Glossary

- **Journey_Map**: The interactive React web application that renders the full developer consumer journey
- **Journey_Stage**: A discrete phase in the developer's decision and usage lifecycle (Trigger, Evaluation_Research, Trial, Experimentation_Loop, Commitment_SignUp, Rapid_Experimentation, Knowledge_Loop)
- **Loop_Stage**: A Journey_Stage that is explicitly cyclical rather than linear (Experimentation_Loop and Knowledge_Loop)
- **Stage_Panel**: The UI component that displays detailed information for a selected Journey_Stage
- **Pain_Point**: A friction, frustration, or unmet need experienced by the developer at a given stage
- **Motivation**: A goal, desire, or driver that propels the developer forward at a given stage
- **Messaging_Opportunity**: A recommended marketing message or value proposition relevant to a stage
- **Media_Touchpoint**: A channel or format (e.g., blog post, YouTube video, Reddit thread, conference talk, in-product prompt) through which a developer encounters information at a stage
- **IDE_Tool**: An AI-assisted developer IDE product; examples include Kiro, Cursor, Claude Code, GitHub Copilot, Cline, TRAE, and Antigravity
- **Developer**: A software engineer or technical practitioner who is the subject of the journey being mapped
- **Marketing_User**: An AWS Marketing Manager or Director (who is also a developer) using the Journey_Map to inform strategy
- **Journey_Navigator**: The top-level navigation component allowing the Marketing_User to move between Journey_Stages
- **Insight_Layer**: A toggleable overlay or section within a Stage_Panel that surfaces Pain_Points, Motivations, Messaging_Opportunities, or Media_Touchpoints
- **Brand_Theme**: The visual design system derived from Initiative and IPG Media brand guidelines, including typography, color palette, and visual language

---

## Requirements

### Requirement 1: Journey Stage Navigation

**User Story:** As a Marketing_User, I want to navigate between distinct stages of the developer journey, so that I can focus on the specific phase most relevant to my current campaign or strategy.

#### Acceptance Criteria

1. THE Journey_Map SHALL render exactly seven Journey_Stages in the following order: Trigger, Evaluation_Research, Trial, Experimentation_Loop, Commitment_SignUp, Rapid_Experimentation, and Knowledge_Loop.
2. THE Journey_Navigator SHALL display all Journey_Stages simultaneously as a horizontal or vertical navigation rail.
3. WHEN a Marketing_User selects a Journey_Stage, THE Journey_Map SHALL display the corresponding Stage_Panel without a full page reload.
4. WHEN a Journey_Stage is active, THE Journey_Navigator SHALL visually distinguish the active stage from inactive stages.
5. THE Journey_Navigator SHALL allow the Marketing_User to move to the next or previous Journey_Stage sequentially.
6. THE Journey_Navigator SHALL visually distinguish Loop_Stages (Experimentation_Loop and Knowledge_Loop) from linear stages using a cyclic or loop indicator in the navigation rail.

---

### Requirement 2: Loop Stage Representation

**User Story:** As a Marketing_User, I want the cyclical nature of the Experimentation_Loop and Knowledge_Loop stages to be visually and conceptually clear, so that I understand these are not linear end-points but recurring cycles.

#### Acceptance Criteria

1. WHEN a Loop_Stage is displayed, THE Stage_Panel SHALL include a visual indicator (e.g., a cycle arrow or loop icon) that communicates the stage is cyclical.
2. THE Journey_Map SHALL render the Experimentation_Loop stage with content that reflects the developer repeatedly experimenting with tools before committing to one.
3. THE Journey_Map SHALL render the Knowledge_Loop stage with content that reflects the continuous cycle of: knowledge gathering → problem solving → advocacy and community showcasing → back to knowledge gathering.
4. WHEN a Marketing_User views the summary view, THE Journey_Map SHALL visually differentiate Loop_Stages from linear stages.

---

### Requirement 3: Stage Panel Content — Pain Points

**User Story:** As a Marketing_User, I want to see the pain points developers experience at each journey stage, so that I can craft messaging that addresses real friction.

#### Acceptance Criteria

1. WHEN a Stage_Panel is displayed, THE Stage_Panel SHALL render at least three Pain_Points relevant to that Journey_Stage.
2. THE Journey_Map SHALL present Pain_Points using plain, developer-native language grounded in realistic scenarios.
3. WHEN a Marketing_User interacts with a Pain_Point, THE Stage_Panel SHALL display an expanded description of that Pain_Point.

---

### Requirement 4: Stage Panel Content — Motivations

**User Story:** As a Marketing_User, I want to understand what motivates developers at each stage, so that I can align messaging with developer goals rather than product features alone.

#### Acceptance Criteria

1. WHEN a Stage_Panel is displayed, THE Stage_Panel SHALL render at least three Motivations relevant to that Journey_Stage.
2. THE Journey_Map SHALL distinguish Motivations visually from Pain_Points within the same Stage_Panel.
3. WHEN a Marketing_User interacts with a Motivation, THE Stage_Panel SHALL display an expanded description of that Motivation.

---

### Requirement 5: Stage Panel Content — Messaging Opportunities

**User Story:** As a Marketing_User, I want to see recommended messaging angles for each journey stage, so that I can develop stage-appropriate marketing content.

#### Acceptance Criteria

1. WHEN a Stage_Panel is displayed, THE Stage_Panel SHALL render at least two Messaging_Opportunities relevant to that Journey_Stage.
2. THE Journey_Map SHALL present each Messaging_Opportunity as an actionable, copy-ready statement or framing.
3. WHEN a Marketing_User interacts with a Messaging_Opportunity, THE Stage_Panel SHALL display rationale explaining why that message is effective at that stage.

---

### Requirement 6: Stage Panel Content — Media Touchpoints

**User Story:** As a Marketing_User, I want to know which media channels and formats reach developers at each stage, so that I can allocate budget and content effort appropriately.

#### Acceptance Criteria

1. WHEN a Stage_Panel is displayed, THE Stage_Panel SHALL render at least three Media_Touchpoints relevant to that Journey_Stage.
2. THE Journey_Map SHALL categorize each Media_Touchpoint by channel type (e.g., social, owned, earned, in-product).
3. WHEN a Marketing_User interacts with a Media_Touchpoint, THE Stage_Panel SHALL display a description of how developers engage with that channel at that stage.
4. THE Journey_Map SHALL reference IDE_Tool-specific examples (e.g., Kiro, Cursor, Claude Code) within Media_Touchpoint descriptions where relevant.

---

### Requirement 7: Insight Layer Toggle

**User Story:** As a Marketing_User, I want to toggle between different insight types (pain points, motivations, messaging, media) within a stage, so that I can focus on one dimension at a time without cognitive overload.

#### Acceptance Criteria

1. THE Stage_Panel SHALL provide controls to show or hide each Insight_Layer independently.
2. WHEN an Insight_Layer is hidden, THE Stage_Panel SHALL not render the content of that layer.
3. WHEN an Insight_Layer is shown after being hidden, THE Stage_Panel SHALL restore the layer content to its previous expanded or collapsed state.
4. THE Journey_Map SHALL default to showing all Insight_Layers when a Stage_Panel is first displayed.

---

### Requirement 8: IDE Tool Reference Integration

**User Story:** As a Marketing_User, I want to see how specific IDE tools are referenced throughout the journey, so that I can understand the competitive landscape and Kiro's positioning at each stage.

#### Acceptance Criteria

1. THE Journey_Map SHALL reference at least five IDE_Tools (Kiro, Cursor, Claude Code, GitHub Copilot, Cline) within journey content.
2. WHEN an IDE_Tool name appears in journey content, THE Journey_Map SHALL render it as a visually distinct inline reference.
3. THE Journey_Map SHALL not position any single IDE_Tool as universally superior within the journey narrative, preserving objectivity for strategic use.

---

### Requirement 9: Journey Overview / Summary View

**User Story:** As a Marketing_User, I want to see a high-level overview of the entire journey at once, so that I can quickly orient myself and identify which stages need the most marketing attention.

#### Acceptance Criteria

1. THE Journey_Map SHALL provide a summary view that displays all seven Journey_Stages and their top-level insight counts simultaneously.
2. WHEN the Marketing_User is in the summary view, THE Journey_Map SHALL allow direct navigation to any Stage_Panel by selecting that stage.
3. THE Journey_Map SHALL visually indicate the relative intensity of developer friction at each stage within the summary view.
4. THE Journey_Map SHALL visually represent the non-linear, looping nature of Experimentation_Loop and Knowledge_Loop within the summary view layout.

---

### Requirement 10: Responsive and Accessible Presentation

**User Story:** As a Marketing_User, I want the journey map to be usable on both desktop and large-screen displays, so that I can reference it during presentations or strategy sessions.

#### Acceptance Criteria

1. THE Journey_Map SHALL render correctly on viewport widths from 1024px to 2560px.
2. THE Journey_Map SHALL use sufficient color contrast between text and background elements to support readability in presentation environments.
3. THE Journey_Map SHALL not rely solely on color to convey meaning; icons or labels SHALL accompany color-coded elements.

---

### Requirement 11: React Web Application Delivery

**User Story:** As a Marketing_User, I want the journey map to be a hosted React web application, so that it can be accessed via a URL and kept up to date without redistributing files.

#### Acceptance Criteria

1. THE Journey_Map SHALL be implemented as a React web application.
2. THE Journey_Map SHALL be deployable to a standard static hosting environment (e.g., S3 + CloudFront, Netlify, Vercel) and accessible via a URL.
3. WHEN opened in a modern web browser (Chrome, Firefox, Safari, Edge — current major versions), THE Journey_Map SHALL render and function correctly.
4. THE Journey_Map SHALL not require the Marketing_User to install any software beyond a standard web browser.

---

### Requirement 12: Initiative and IPG Media Brand Compliance

**User Story:** As a Marketing_User, I want the journey map to reflect Initiative and IPG Media brand guidelines, so that the artifact feels consistent with our agency's visual identity when shared internally or with clients.

#### Acceptance Criteria

1. THE Journey_Map SHALL apply the Brand_Theme derived from Initiative and IPG Media brand guidelines, including their defined typography, color palette, and visual language.
2. THE Journey_Map SHALL not use AWS-specific or Kiro-specific branding (colors, logos, or typographic styles) as the primary visual identity.
3. WHEN rendering the Brand_Theme, THE Journey_Map SHALL apply Initiative/IPG typography choices to all headings, body text, and UI labels.
4. WHEN rendering the Brand_Theme, THE Journey_Map SHALL apply the Initiative/IPG color palette to navigation elements, stage indicators, and insight layer controls.
