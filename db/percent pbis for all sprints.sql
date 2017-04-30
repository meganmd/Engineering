SELECT p.sprint, i.id, row, IFNUll(x.percentComplete,0) as percentComplete  
FROM productBacklogItems i JOIN sprintPBIs p on i.id=p.id and i.project=p.project LEFT OUTER JOIN (
  SELECT sprint, pbi, sum(percent) as percentComplete
  FROM tasks WHERE columnNumber=3 AND project='newProject1' 
  GROUP BY sprint, pbi
 ) x on x.sprint=p.sprint and x.pbi=p.id
  WHERE i.project='newProject1' ORDER BY row