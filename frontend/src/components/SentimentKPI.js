import React from 'react';
export default function SentimentKPI({title,value}){
return (
<div className="kpi">
<div className="kpi-title">{title}</div>
<div className="kpi-value">{value}</div>
</div>
);
}