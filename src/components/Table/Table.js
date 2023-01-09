import React from 'react';
import "./Table.css";

const Table = ({pointTable}) => {
    // const rowData = pointTable.map(arr =>  {
    //     return <td>{arr[0]}</td>
    // });
    let rowData = [];
    for (let i = 0; i < pointTable[0].length; i++){
        let row = [];
        const rank = pointTable[0].indexOf(i);
        pointTable.forEach(column =>  {
            row.push(column[rank]);
        });
        rowData.push(row);
    }
    rowData.forEach(row => row[0]++);
    const tableHeading = ['Rank','Teams','MP','W','D','L','GF','GA','GD','Pts'];
    return (
        <div>
            {
                pointTable[0].length > 0 &&
                <table>
                    <tr>
                    {
                        tableHeading.map(title =>{
                            return <th>{title}</th>
                        })
                    }
                    </tr>
                
                {
                    rowData.map(row =>{
                        return <tr>
                            {
                                row.map(value =>{
                                    return <td>{value}</td>
                                })
                            }
                        </tr>
                    })
                }
                </table>
            }
        </div>
    );
};

export default Table;