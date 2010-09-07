using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Ack5.UnitTesting
{
    static class UnitTesting
    {
        public static void TestAll()
        {
            UnitTestingConceptNameManager.Test();
        }

        public static void AssertEquals(bool bool1, bool bool2)
        {
            if (bool1 != bool2)
                throw new Exception("Both should be equal");
        }
    }
}
