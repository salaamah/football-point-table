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
            <table>
                <tbody>
                    {
                        tableHeading.map(title =>{
                            return <th>{title}</th>
                        })
                    }
                </tbody>
                {
                    rowData.map(row =>{
                        return <tbody>
                            {
                                row.map(value =>{
                                    return <td>{value}</td>
                                })
                            }
                        </tbody>
                    })
                }
            </table>
    );
};

export default Table;