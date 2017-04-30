SELECT sprint, pbi, member, SUM(percent) as percentComplete 
FROM (SELECT sprint, pbi, member, 
    CASE
       WHEN columnNumber < 3 THEN 0
       ELSE percent
      END as percent
      FROM tasks
      WHERE project = 'newProject1'
	 )
    GROUP BY sprint, pbi, member