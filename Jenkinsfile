
@Library('libpipelines@master') _

hose {
  EMAIL = 'egeo'
  DEVTIMEOUT = 30
  MODULE = 'st-monaco-editor'
  REPOSITORY = 'github.com/stratio/st-monaco-editor'
  PKGMODULES = ['dist']
  PKGMODULESNAMES = ['st-monaco-editor']
  RELEASETIMEOUT = 30
  ENABLE_MAVENPARALLELBUILD=false
  NEW_VERSIONING=true
  BUILDTOOL='npm'
  BUILDTOOLVERSION='10.15.3'

  //DEPLOYONPRS=true

  DEV = { config ->
    doCompile(config)
    doPackage(config)
    doStaticAnalysis(config)
    //doUT(config)
    //doDoc(config)
    doDeploy(config)
  }
}
