namespace BugMachine.Tests;
using Xunit;
using BugMachine.Current;

public class TreeTraversalTests
{
    private static BinaryTree BuildBST(params int[] values)
    {
        var tree = new BinaryTree();
        foreach (var v in values) tree.Insert(v);
        return tree;
    }

    [Fact]
    public void InorderTraversal_BST_ReturnsSortedOrder()
    {
        // Inorder på ett BST ska ge sorterade värden
        var tree = BuildBST(5, 3, 7, 1, 4, 6, 8);
        var result = tree.InorderTraversal();
        Assert.Equal([1, 3, 4, 5, 6, 7, 8], result);
    }

    [Fact]
    public void InorderTraversal_SingleNode_ReturnsThatValue()
    {
        var tree = BuildBST(42);
        Assert.Equal([42], tree.InorderTraversal());
    }

    [Fact]
    public void InorderTraversal_EmptyTree_ReturnsEmpty()
    {
        var tree = new BinaryTree();
        Assert.Empty(tree.InorderTraversal());
    }

    [Fact]
    public void InorderTraversal_LinearTree_ReturnsSortedOrder()
    {
        // Alla värden satta till höger → "linjärt träd"
        var tree = BuildBST(1, 2, 3, 4, 5);
        Assert.Equal([1, 2, 3, 4, 5], tree.InorderTraversal());
    }

    [Fact]
    public void PreorderTraversal_BST_RootFirst()
    {
        var tree = BuildBST(5, 3, 7);
        var result = tree.PreorderTraversal();
        // Preorder: Root → Vänster → Höger
        Assert.Equal([5, 3, 7], result);
    }

    [Fact]
    public void PreorderTraversal_EmptyTree_ReturnsEmpty()
    {
        var tree = new BinaryTree();
        Assert.Empty(tree.PreorderTraversal());
    }

    [Fact]
    public void InorderTraversal_SequentialInserts_ProducesSortedOutput()
    {
        var tree = BuildBST(10, 5, 15, 3, 7, 12, 20);
        var result = tree.InorderTraversal();
        // Ska vara sorterat
        for (int i = 1; i < result.Count; i++)
            Assert.True(result[i] >= result[i - 1]);
    }
}
