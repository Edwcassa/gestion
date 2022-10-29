import React from 'react'
import { Table } from 'react-bootstrap'

export default function Historial() {

  const [loading, setLoading] = React.useState(true)

  const alumnos = [
    'CASSA-LIPA-EDWAR YURI',
    'CUSIHUAMAN-AUCCACUSI-LUIS ALDAIR',
    'QUISPE-TITTO-JOEL WILLY',
    'TINTAYA-TACO-YUREMA LISBETH',
    'PEREIRA-CHINCHERO-RICHARD MIKHAEL',
    'ESPEJO-FRANCO-MELISSA BRIGGITTE',
    'VILLASANTE-LEON-AMARU',
    'FARFAN_ENRIQUEZ-GABRIELA',
    'ARCE-QUISPE-RUTH MILAGROS',
    'CAHUATA-LAVILLA-YOLMY MILAGROS',
    'HUAMAN-ATAYUPA-LISBET PAOLA',
    'DEL CASTILLO-OVALLE-LUZ MARINA',
    'VILLALOBOS-QUISPE-PAMELA ARACELY',
  ]

  setTimeout(() => {
    setLoading(false)
  }, 500);

  console.log(loading)

  return (
    <>
      <h1>Asistencia</h1>
      <br />
      {loading && <strong>Loading.. <div className="spinner-border spinner-border-sm ms-2" role="status"></div></strong>}

      {
        !loading && (
          <Table>
            <thead>
              <tr>
                <td><strong>Nombres</strong></td>
                {
                  [...Array(6)].map((e, i) => (
                    <td key={i}><strong>{`${12 + i}/08/22`}</strong></td>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                alumnos.map((e, i) => (
                  <tr key={i}>
                    <td>{e}</td>
                    {
                      [...Array(6)].map((e, i) => (
                        <td key={i}>
                          {
                            (Math.random() > 0.3) ? <div className='bg-primary rounded' style={{ width: 20, height: 20 }}></div> : <div className='bg-danger rounded' style={{ width: 20, height: 20 }}></div>
                          }
                        </td>
                      ))
                    }
                  </tr>
                ))
              }
            </tbody>
          </Table>
        )
      }
    </>
  )
}