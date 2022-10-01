import React from "react"
import ReactECharts from 'echarts-for-react';



export default function Estadisticas() {
  var option0;
  var option;
  var option2;
  var option3;

  option0 = 
  {
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: '%',
      top: '5%'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        top: '10%',
        radius: '75%',
        data: [
          { value: 2, name: 'CURSOS LIBRES' },
          { value: 8, name: 'TOTAL DE CURSOS' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(20, 10, 3, 0.5)'
          }
        }
      }
    ]
  };
  option =
  {
    title: {

      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: '%',
      top: '5%'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        top: '10%',
        radius: '75%',
        data: [
          { value: 3, name: 'DOCENTES CONTRATADOS' },
          { value: 5, name: 'DOCENTES NOMBRADOS' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  option2 = {
    xAxis: {
      type: 'category',
      data: ['009', '008', '007', '006', '003', '002', '005', '012', '010']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [90, 100, 75, 82, 89, 90, 78, 98, 0],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.1)'
        }
      }
    ]
  };
  option3 =
  {
    title: {

      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: '%',
      top: '5%'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        top: '10%',
        radius: '75%',
        data: [
          { value: 6, name: 'DOCENTES OCUPADOS' },
          { value: 2, name: 'DOCENTES LIBRES' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(20, 10, 3, 0.5)'
          }
        }
      }
    ]
  };
  return (

    <div className='container bg-white'>

    
    
      <h2> PORCENTAJE DE ASISTENCIA DOCENTE</h2>
      <div className="row border">
        <hr />
        <div className="d-flex justify-content-center " style={{ width: '100%', paddingLeft: '250px' }}>

          <div className="col">
            <ReactECharts option={option2} style={{ width: 500 }}/>

          </div>
        </div>
      </div>

      <h2> CURSOS ASIGNADOS RESPECTO AL TOTAL DE CURSOS</h2>
      <div className="row border">
        <div className="col-12  py-3">
          <ReactECharts option={option0} />
        </div>
      </div>

      <h2> NUMERO DE DOCENTES CONTRATADOS Y NOMBRADOS EN EL DEPARTAMENTO DE INFORMATICA</h2>
      <div className="row border">
        <div className="col-12  py-3">
          <ReactECharts option={option} />
        </div>
      </div>
      <div>
        <h2> NUMERO DE DOCENTES LIBRES Y CON CARGA ACADEMICA </h2>
        <div className="row border">
          <div className="col-12  py-3">
            <ReactECharts option={option3} />
          </div>
        </div>
      </div>
    </div>

  )
}

