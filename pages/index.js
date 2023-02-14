import styles from '../styles/Home.module.css'

 const Home = ()=>{
  return (
    <>
      <div className={styles.main}>
          <h1>Welcome to db server based on fauna db and  Next.js!</h1><br/>
          {/*<h3>Database &quot;users.db&quot; has table &quot;person&quot; that contains informaition in the following form:</h3>*/}
          {/*<Image src={tablePic}  alt="sqlite3 data example" priority="true"  />*/}
        <h4>This server allows you to use the fauna db to test the interaction <br/>between your application and some database with the CRUD API
        </h4>
          <h2>API CRUD server has the next endpoints:</h2>
        <table className={styles.table}>
          <thead >
            <tr style={{backgroundColor: "ghostWhite"}} >
              <th style={{width: "150px", borderBottom: "1px solid #c6c6c6" }}>Method</th>
              <th style={{width: "200px", borderBottom: "1px solid #c6c6c6"  }}>Endpoint</th>
              <th style={{width: "450px", borderBottom: "1px solid #c6c6c6"  }}>Description</th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td colSpan="3" className={styles.tdEmpty}></td>
          </tr>
          <tr>
            <td  className={styles.tdBottomBorder + " " + styles.colorPostMethod}><b className={styles.tdFlexCenter}>CREATE</b></td>
            <td  className={styles.tdBottomBorder + ' ' +styles.tdPaddingLeft + " " + styles.colorPostMethod}>/api/person/restore</td>
            <td  className={styles.tdBottomBorder + ' ' +styles.tdPaddingLeft + " " + styles.colorPostMethod}><i>Restore table &quot;person&quot; to original state  </i></td>
          </tr>
          <tr >
            <td className={styles.tdBottomBorder}><div className={styles.tdFlexCenter}>request with:</div></td>
            <td colSpan="3" className={styles.tdBottomBorder + ' ' + styles.tdReqTextStyle} >
                <pre style={{margin: "0px"}}>
                  {
                      "method:'POST';\n" +
                      "headers: {'Content-Type': 'application/json'};\n" +
                      "body: JSON.stringify({\"login\": \"admin\",\"password\": \"5678\"});\n" +
                      "redirect: 'follow'"
                  }
                </pre>
            </td>
          </tr>
            <tr>
              <td colSpan="3" className={styles.tdEmpty} ></td>
            </tr>
            <tr>
              <td  className={styles.tdBottomBorder + " " + styles.colorPostMethod}><b className={styles.tdFlexCenter}>CREATE</b></td>
              <td  className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorPostMethod}>/api/person</td>
              <td  className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorPostMethod}><i>Create one person with firstname, lastname, and role</i></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder}><div className={styles.tdFlexCenter}>request with:</div></td>
              <td colSpan="3" className={styles.tdBottomBorder + ' ' + styles.tdReqTextStyle}>
                <pre style={{margin: "0px"}}>
                  {
                      "method:'POST';\n" +
                      "headers: {'Content-Type': 'application/x-www-form-urlencoded'};\n" +
                      "body: {\"firstname\":\"Ben\",\"lastname\":\"Rogers\",\"role\":\"captain\"}\n" +
                      "redirect: 'follow'"
                  }
                </pre>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className={styles.tdEmpty}></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder + " " + styles.colorGetMethod}><b className={styles.tdFlexCenter}>READ</b></td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorGetMethod}>/api/person</td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorGetMethod}><i>Read all persons</i></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder}><div className={styles.tdFlexCenter}>request with:</div></td>
              <td colSpan="3" className={styles.tdBottomBorder + ' ' + styles.tdReqTextStyle}>
                <pre style={{margin: "0px"}}>
                  {
                      "method:'GET';\n" +
                      "redirect: 'follow'"
                  }
                </pre>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className={styles.tdEmpty}></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder + " " + styles.colorGetMethod}><b className={styles.tdFlexCenter}>READ</b></td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorGetMethod}>/api/person/id/[id]</td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorGetMethod}><i>Read one person by id</i></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder}><div className={styles.tdFlexCenter}>request with:</div></td>
              <td colSpan="3" className={styles.tdBottomBorder + ' ' + styles.tdReqTextStyle}>
                <pre style={{margin: "0px"}}>
                  {
                      "method:'GET';\n" +
                      "redirect: 'follow'"
                  }
                </pre>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className={styles.tdEmpty}></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder + " " + styles.colorPutMethod}><b className={styles.tdFlexCenter}>UPDATE</b></td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorPutMethod}>/api/person/id/[id]</td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorPutMethod}><i>Update one person all data by id</i></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder}><div className={styles.tdFlexCenter}>request with:</div></td>
              <td colSpan="3" className={styles.tdBottomBorder + ' ' + styles.tdReqTextStyle}>
                <pre style={{margin: "0px"}}>
                  {
                      "method:'PUT';\n" +
                      "headers: {'Content-Type':'application/x-www-form-urlencoded'};\n" +
                      "body: \"{\"firstname\":\"Peter\",\"lastname\":\"Parker\",\"role\":\"spider-man\"}\"\n"+
                      "redirect: 'follow'"
                  }
                </pre>
              </td>
            </tr>
          <tr>
            <td colSpan="3" className={styles.tdEmpty}></td>
          </tr>
          <tr>
            <td className={styles.tdBottomBorder + " " + styles.colorPutMethod}><b className={styles.tdFlexCenter}>UPDATE</b></td>
            <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorPutMethod}>/api/person/id/[id]</td>
            <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorPutMethod}><i>Update some fields in persons data by id</i></td>
          </tr>
          <tr>
            <td className={styles.tdBottomBorder}><div className={styles.tdFlexCenter}>request with:</div></td>
            <td colSpan="3" className={styles.tdBottomBorder + ' ' + styles.tdReqTextStyle}>
                <pre style={{margin: "0px"}}>
                  {
                      "method:'PATCH';\n" +
                      "headers: {'Content-Type':'application/x-www-form-urlencoded'};\n" +
                      "body: \"{\"role\":\"spider-man\"}\"\n"+
                      "redirect: 'follow'"
                  }
                </pre>
            </td>
          </tr>
            <tr>
              <td colSpan="3" className={styles.tdEmpty}></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder + " " + styles.colorDeleteMethod}><b className={styles.tdFlexCenter}>DELETE</b></td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorDeleteMethod}>/api/person/id/[id]</td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorDeleteMethod}><i>Delete one person by id</i></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder}><div className={styles.tdFlexCenter}>request with:</div></td>
              <td colSpan="3" className={styles.tdBottomBorder + ' ' + styles.tdReqTextStyle}>
                <pre style={{margin: "0px"}}>
                  {
                      "method:'DELETE';\n" +
                      "redirect: 'follow'"
                  }
                </pre>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className={styles.tdEmpty}></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder + " " + styles.colorDeleteMethod}><b className={styles.tdFlexCenter}>DELETE</b></td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorDeleteMethod}>/api/person</td>
              <td className={styles.tdBottomBorder +' ' +styles.tdPaddingLeft + " " + styles.colorDeleteMethod}><i>Delete all persons</i></td>
            </tr>
            <tr>
              <td className={styles.tdBottomBorder}><div className={styles.tdFlexCenter}>request with:</div></td>
              <td colSpan="3" className={styles.tdBottomBorder + ' ' + styles.tdReqTextStyle}>
                <pre style={{margin: "0px"}}>
                  {
                      "method:'DELETE';\n" +
                      "redirect: 'follow'"
                  }
                </pre>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Home