# Error log

This document lists errors that occurred during implementation and required correction by the user:

## State Variable Errors
1. **Incorrect State Variable Name**: Used incorrect variable name in Header component (corrected to use `gameState` instead of a custom named variable)

## Numeric Calculation Issues
1. **Floating Point Precision**: Manipulation points displaying with trailing `.99999999` due to floating point calculation issues
2. **Rounding Error**: Needed to implement proper rounding in resource calculations

## React Maximum Depth Errors
1. **Maximum Update Depth Exceeded**: Recursive re-rendering issue causing maximum update depth to be exceeded

## Feature Logic Errors
1. **Tab Visibility After Era Reset**: Tabs incorrectly being hidden again after traveling back to earlier eras
2. **Persistence of Unlocked Features**: After unlocking a feature from a later era and going back to an earlier era, features were incorrectly being hidden again

## Achievement System Issues
1. **New Achievements Not Visible**: Existing players couldn't see new achievements as they were added
2. **Save/Load Logic Flaw**: LOAD_GAME action not patching achievements with default values for new entries

## UI Component Issues
1. **Concentric Game Buttons Visibility**: Only seeing [Q] and Brain icons but no other icons/shortcuts in the circles
2. **Button Positioning**: Positioning/visibility issue with game button elements
3. **Incorrect Color Scheme**: Button colors not following the intended color scheme (Manipulation: Red, Credibility: Blue, Networks: Green, Influence: Purple)

## Progressive Discovery Implementation
1. **Scenario Reveal Logic**: Scenarios not properly implementing one-by-one reveal based on era
2. **Theory Cost Display**: Theories not showing relative cost amount (xx/500) and revealing at 50% affordability
3. **Era-Based Content Visibility**: Content from "never reached" eras still visible after resetting to earlier era

## French Character Encoding
1. **Unescaped Characters**: French accented characters causing encoding errors throughout the codebase

## Timeout Handling
1. **Notification Timeout**: Achievements and notifications not disappearing after timeout period
2. **Missing Progress Bar**: Timeout visual indicator (decreasing bar) not implemented

# Errors at end of Q1 sprints

## SameKey

Encountered two children with the same key, `1741036007016`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.

src/components/game/NotificationSystem.tsx (89:9) @ [project]/src/components/game/NotificationSystem.tsx [app-client] (ecmascript)/NotificationSystem/<.children<

  87 |     <div className="fixed top-4 right-4 z-50 space-y-2 max-w-xs">
  88 |       {notifications.map(notification => (
> 89 |         <div 
     |         ^
  90 |           key={notification.id}
  91 |           className={`${getNotificationStyles(notification.type)} border rounded-lg shadow-lg flex items-start p-4 transition-all duration-300 transform translate-x-0`}
  92 |         >