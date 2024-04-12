using Amazon.CDK;

namespace CdkWorkshop
{
    sealed class Program
    {
        public static void Main(string[] args)
        {
            var app = new App();
            new CdkWorkshopStack(app, "CdkWorkshopStack");

            app.Synth();
        }
    }
}

//This is the entry point of the application.
//It loads the stack as it is defined in CdkWorkshopStack.