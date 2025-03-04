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